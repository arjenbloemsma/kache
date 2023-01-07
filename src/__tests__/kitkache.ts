import {kitKache} from '../kitkache'

// Date and time returned by Date.now() => October 12th, 2019 01:15 AM
const frozenDateAndTime = new Date(Date.UTC(2019, 9, 12, 1, 15))
Date.now = jest.fn(() => frozenDateAndTime.valueOf())

let store = {}

const spiedSetItem = jest
  .spyOn(globalThis.Storage.prototype, 'setItem')
  .mockImplementation((key: string, value: unknown) => (store[key] = value))
const spiedGetItem = jest
  .spyOn(globalThis.Storage.prototype, 'getItem')
  .mockImplementation((key: string) => store[key])

beforeEach(() => (store = {}))
afterEach(() => {
  spiedSetItem.mockClear()
  spiedGetItem.mockClear()
})
afterAll(() => {
  spiedSetItem.mockRestore()
  spiedGetItem.mockRestore()
})

// eslint-disable-next-line max-lines-per-function
describe('Conditional storage', () => {
  test(`Should store string 'this-is-not-tokyo'`, async () => {
    // arrange
    const retrieveValue = () => Promise.resolve('this-is-not-tokyo')
    // act
    const result = await kitKache<string>(
      'key-for-not-tokyo',
      {
        expireAfterSecs: 10,
        storeCondition: value => value !== 'tokyo',
      },
      retrieveValue,
    )
    // assert
    expect(result).toBe('this-is-not-tokyo')
    expect(spiedSetItem).toBeCalledTimes(1)
    expect(spiedSetItem).toHaveBeenCalledWith(
      'key-for-not-tokyo',
      '{"timestamp":1570842900000,"value":"this-is-not-tokyo"}',
    )
  })

  test(`Should not store string 'tokyo'`, async () => {
    // arrange
    const retrieveValue = () => Promise.resolve('tokyo')
    // act
    const result = await kitKache<string>(
      'key-for-tokyo',
      {
        expireAfterSecs: 10,
        storeCondition: value => value !== 'tokyo',
      },
      retrieveValue,
    )
    // assert
    expect(result).toBe('tokyo')
    expect(spiedSetItem).toBeCalledTimes(0)
  })

  test(`Should store when no condition has been defined`, async () => {
    // arrange
    const retrieveValue = () => Promise.resolve('sapporo')
    // act
    const result = await kitKache<string>(
      'key-for-sapporo',
      {
        expireAfterSecs: 10,
      },
      retrieveValue,
    )
    // assert
    expect(result).toBe('sapporo')
    expect(spiedSetItem).toBeCalledTimes(1)
    expect(spiedSetItem).toHaveBeenCalledWith(
      'key-for-sapporo',
      '{"timestamp":1570842900000,"value":"sapporo"}',
    )
  })
})

// eslint-disable-next-line max-lines-per-function
describe('Cache invalidation', () => {
  test('Item in cache has not yet expired', async () => {
    // arrange
    store = {
      ...store,
      'key-for-sendai': JSON.stringify({
        timestamp: new Date(Date.UTC(2019, 9, 12, 1, 14, 57)).valueOf(),
        value: 'sendai',
      }),
    }
    const retrieveValue = () => Promise.resolve('sendai')
    // act
    const result = await kitKache<string>(
      'key-for-sendai',
      {
        expireAfterSecs: 10,
      },
      retrieveValue,
    )
    // assert
    expect(result).toBe('sendai')
    expect(spiedSetItem).toBeCalledTimes(0)
  })

  test('Item in cache has expired', async () => {
    // arrange
    store = {
      ...store,
      'key-for-akita': JSON.stringify({
        timestamp: new Date(Date.UTC(2019, 9, 12, 1, 14, 47)).valueOf(),
        value: 'akita',
      }),
    }
    const retrieveValue = () => Promise.resolve('akita')
    // act
    const result = await kitKache<string>(
      'key-for-akita',
      {
        expireAfterSecs: 10,
      },
      retrieveValue,
    )
    // assert
    expect(result).toBe('akita')
    expect(spiedSetItem).toBeCalledTimes(1)
    expect(spiedSetItem).toHaveBeenCalledWith(
      'key-for-akita',
      '{"timestamp":1570842900000,"value":"akita"}',
    )
  })
})
