import { KitKacheConfig } from "./types"

/**
 * Get the expiration period in seconds from the config object, will always return the most specific option. If seconds have been provided, this function will return just that.
 * @param config A configuration object which specifies the behavior of the cache
 */
export const getExpiryPeriod = <T>({
    expireAfterSecs,
    expireAfterMins,
    expireAfterHours,
  }: KitKacheConfig<T>) => {
    if (expireAfterSecs) return expireAfterSecs
    if (expireAfterMins) return expireAfterMins * 60
    if (expireAfterHours) return expireAfterHours * 60 * 60
    throw Error("No expiration period has been set")
  }