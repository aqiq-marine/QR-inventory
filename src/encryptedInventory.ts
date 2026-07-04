const encryptedInventory = {
  version: 1,
  kdf: {
    name: 'PBKDF2',
    hash: 'SHA-256',
    iterations: 210000,
    salt: '4e9LvOy7fH2HHuvULpiYCw==',
  },
  cipher: {
    name: 'AES-GCM',
    iv: 'hA8Of6BEoReEdPww',
  },
  payload:
    '1mCkeeSj0Ij5fqUHEb2Gloz5WmL+HhJWlrBh92/a8C/xUFooi5swyXrdbRgdHUfH1+PQcm7L8NzQXpXuPuNvLMhz3nlFrr3gSGBWPvzVcLAaZ5+cQkgkyTTuxOSpqacxTJXxRZilPcraUIp6TcDuUxuUH5NzNyvNDt8DrJ882C2qB/6CmztMJIdID+rDp5p2T9jxOdXH5DkGpQdDXbxXY+qZHNyQP2s94PcZ1dsKGkS/o/GPnxtFxcm/NdP4pl3o6VLuKA+J3G6i0m90bO7qCdYzhBfRn7J6knapQPa0vRzNEhtA91rZaODjVIUJFswOoGFZg3jVmW8t3ZOd8a6RSJeKf/c0XeCi/UalXgiC7XXncJqWY3WJATwo1Foa8hVpzUZDjM0Omf4a8JNnm2v63LO3dHnrEkKd/dokGty/PteS9LSxjlc7NGt3zzz72f6OzpnFuYqaI9svX8naPE96hQtc7Kk1YY5N8x3B1vWVh6jk7ZiEjNWqwgR83zbIP9KN6+wdW1ScJ8cXNv4dCETGygLxJbD7K9X55YRlMo+92TGyypyAUSJm4hEd8wGLwROKBsy/0CTbM3VVZUyDY1XuMtfDt2LqoafpU/8XKgQyKKk6+/OGnpgwqKLyblxjZ934Cz9XLtsAjIV7lMFtG9f/3rFSkERUt1mbwmsaY1X+VOz/2CeT09MTPXnztkZlgNtgaS+lDekzMAE2PVDz4D3o2LmHxMz1GGrQuu8uywBcqCW2y4gXeOOV9hj0tJubnBfKxlsQgTS680JeuDlCb0dZYyHSKsgU3uhIeMWSeNRiLX2KB5BTK8klo3Ceuk37yR44vPz1F3iYIJ/5rgpNJ1rZXMVUE+Jb2yBaiFjRoSOutz8NcGb71iToWlMty/2hc1Db2DtIDSWtoTCuzGNuDAsFxe/pWfvXavUxyBnx/11JtDU=',
} as const

export default encryptedInventory
