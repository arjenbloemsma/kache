export type KitKacheConfig<T> = {
  expireAfterSecs?: number
  expireAfterMins?: number
  expireAfterHours?: number
  storeCondition?: (value: T) => boolean
}
