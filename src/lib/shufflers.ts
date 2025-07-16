export function createPersistentShuffler(key: string, allItems: string[]) {
  const stored = localStorage.getItem(key)
  let pool = stored ? JSON.parse(stored) : [...allItems]

  function savePool() {
    localStorage.setItem(key, JSON.stringify(pool))
  }

  function next(): string {
    if (pool.length === 0) {
      pool = [...allItems]
    }
    const index = Math.floor(Math.random() * pool.length)
    const value = pool.splice(index, 1)[0]
    savePool()
    return value
  }

  return { next }
}
