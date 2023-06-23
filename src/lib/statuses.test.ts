import { getGuessStatuses } from './statuses'

const mockSolutionGetter = jest.fn()

beforeEach(() => {
  jest.mock('./words', () => ({
    ...jest.requireActual('./words'),
    get solution() {
      return mockSolutionGetter()
    },
  }))
})

describe('getGuessStatuses', () => {
  test('guess statuses', () => {
    expect(getGuessStatuses('ABCDE', 'EDCBA', 'FIBBY')).toEqual([
      'present',
      'present',
      'correct',
      'present',
      'present',
    ])
    expect(getGuessStatuses('ABCDE', 'VWXYZ', 'FIBBY')).toEqual([
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ])
    expect(getGuessStatuses('ABCDE', 'ABCDE', 'FIBBY')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ])

    // https://github.com/cwackerfuss/react-wordle/issues/456
    expect(getGuessStatuses('BOSSY', 'SASSY', 'FIBBY')).toEqual([
      'absent',
      'absent',
      'correct',
      'correct',
      'correct',
    ])
  })
})
