import type { Inventory, InventoryEnvelope } from './inventory'

const encoder = new TextEncoder()
const decoder = new TextDecoder()
const ITERATIONS = 210_000

function toBase64(bytes: Uint8Array) {
  let binary = ''
  const chunkSize = 0x8000

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }

  return btoa(binary)
}

function fromBase64(value: string) {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

async function deriveKey(password: string, salt: ArrayBuffer) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

export async function encryptInventory(
  inventory: Inventory,
  password: string,
): Promise<InventoryEnvelope> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt.buffer as ArrayBuffer)
  const payload = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(JSON.stringify(inventory)),
  )

  return {
    version: 1,
    kdf: {
      name: 'PBKDF2',
      hash: 'SHA-256',
      iterations: ITERATIONS,
      salt: toBase64(salt),
    },
    cipher: {
      name: 'AES-GCM',
      iv: toBase64(iv),
    },
    payload: toBase64(new Uint8Array(payload)),
  }
}

export async function decryptInventory(
  envelope: InventoryEnvelope,
  password: string,
) {
  if (envelope.version !== 1) {
    throw new Error('Unsupported encrypted inventory version.')
  }

  const salt = fromBase64(envelope.kdf.salt)
  const iv = fromBase64(envelope.cipher.iv)
  const key = await deriveKey(password, salt.buffer as ArrayBuffer)
  const payload = fromBase64(envelope.payload)
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    payload,
  )

  return JSON.parse(decoder.decode(plaintext))
}
