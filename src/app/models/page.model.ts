export type Page<T> = {
  pagination: {
    skipped: number,
    count: number,
    total: number,
    hasNext: boolean
  },
  results: T[]
}
