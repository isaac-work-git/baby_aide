// composables/useShuffledQueue.ts
export function useShuffledQueue<T>(items: T[]) {
  let queue: T[] = []

  function next(): T {
    if (queue.length === 0) {
      queue = [...items].sort(() => Math.random() - 0.5)
    }
    return queue.pop()!
  }

  function getIndex(item: T): number {
    return items.indexOf(item)
  }

  return { next, getIndex }
}
