const timeDiffInSecs = (startTime: number, endTime: number) => {
  const timeDiff = endTime - startTime //in ms
  return Math.round(timeDiff / 1000)
}

type KitKacheConfig<T> = {
  expireAfterSecs: number
  storeCondition?: (value: T) => boolean
}

/**
 * A simple and configurable cache wrapper around the localStorage API
 * @param key The key under which the object is stored
 * @param config A configuration object which specifies the behavior of the cache
 * @param objectLoader A async function to load the object from the cache
 * @returns A promise containing the value
 */
export const kitKache = async <T>(
  key: string,
  config: KitKacheConfig<T>,
  objectLoader: () => Promise<T>,
): Promise<T> => {
  const cachedObject = JSON.parse(
    globalThis.localStorage.getItem(key) ?? 'null',
  )
  if (
    cachedObject === null ||
    (cachedObject &&
      timeDiffInSecs(cachedObject.timestamp, Date.now()) >
        config.expireAfterSecs)
  ) {
    const value = await objectLoader()
    const shouldStoreInCache = config.storeCondition
      ? config.storeCondition(value)
      : true
    if (shouldStoreInCache) {
      globalThis.localStorage.setItem(
        key,
        JSON.stringify({
          timestamp: Date.now(),
          value,
        }),
      )
    }
    return value
  }
  return cachedObject.value
}
