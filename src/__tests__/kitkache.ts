import {kitKache} from '../kitkache'

let store = {}

const spiedSetItem = jest
  .spyOn(globalThis.Storage.prototype, 'setItem')
  .mockImplementation((key: string, value: unknown) => (store[key] = value))

beforeEach(() => (store = {}))

afterEach(() => spiedSetItem.mockRestore())

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
})
