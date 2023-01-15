import {getExpiryPeriod} from '../configuration'
import {KitKacheConfig} from '../types'

describe('Expiration period', () => {
  test('Should throw error if none of expiration options have been provided', () => {
    expect(() => {
      getExpiryPeriod({} as KitKacheConfig<unknown>)
    }).toThrow('No expiration period has been set')
  })

  test('Should return seconds even if minutes are also provided', () => {
    // arrange
    const config: KitKacheConfig<unknown> = {
      expireAfterMins: 3,
      expireAfterSecs: 10,
    }
    // act
    const result = getExpiryPeriod(config)
    // assert
    expect(result).toBe(10)
  })

  test('Should return minutes even if hours are also provided', () => {
    // arrange
    const config: KitKacheConfig<unknown> = {
      expireAfterHours: 2,
      expireAfterMins: 90, // 90 * 50 = 5400 secs
    }
    // act
    const result = getExpiryPeriod(config)
    // assert
    expect(result).toBe(5400)
  })

  test('Should return correct number of seconds if hours are provided', () => {
    // arrange
    const config: KitKacheConfig<unknown> = {
      expireAfterHours: 2,
    }
    // act
    const result = getExpiryPeriod(config)
    // assert
    expect(result).toBe(7200)
  })
})
