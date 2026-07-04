export type Reagent = {
  id: string
  name: string
  shelf: string
}

export type Inventory = {
  reagents: Reagent[]
}

export type InventoryEnvelope = {
  version: 1
  kdf: {
    name: 'PBKDF2'
    hash: 'SHA-256'
    iterations: number
    salt: string
  }
  cipher: {
    name: 'AES-GCM'
    iv: string
  }
  payload: string
}

export function normalizeInventory(input: unknown): Inventory {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid inventory payload.')
  }

  const source = input as Record<string, unknown>
  const rawReagents = source.reagents

  if (!Array.isArray(rawReagents)) {
    throw new Error('Inventory payload is missing reagents.')
  }

  const reagents = rawReagents
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null
      }

      const candidate = entry as Record<string, unknown>
      const id = typeof candidate.id === 'string' ? candidate.id.trim() : ''
      const name = typeof candidate.name === 'string' ? candidate.name.trim() : ''
      const shelf =
        typeof candidate.shelf === 'string' ? candidate.shelf.trim() : ''

      if (!id || !name || !shelf) {
        return null
      }

      return { id, name, shelf }
    })
    .filter((entry): entry is Reagent => entry !== null)

  const seen = new Set<string>()
  const deduped = reagents.filter((entry) => {
    const key = entry.id.toLowerCase()
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })

  return { reagents: deduped }
}

export function buildReagentIndex(inventory: Inventory) {
  const byId = new Map<string, Reagent>()

  for (const reagent of inventory.reagents) {
    byId.set(reagent.id.toLowerCase(), reagent)
  }

  return byId
}
