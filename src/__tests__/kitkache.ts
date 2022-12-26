import {exportedForTesting} from '../kitkache'

describe('Time difference', () => {
  const {timeDiffInSecs} = exportedForTesting
  test('Should return 127', () => {
    // arrange
    const start = 1671966055510
    const end = 1671966182428
    // act
    const result = timeDiffInSecs(start, end)
    // assert
    expect(result).toBe(127)
  })

  test.todo(
    'Should be another perfect example of a very descriptive test title of a test to come',
  )
})
