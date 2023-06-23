import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: string[],
  fibs: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)

  guesses.forEach((word, wordIndex) => {
    unicodeSplit(word).forEach((letter, i) => {
      let letterToUse = letter;
      if (word !== solution) {
        letterToUse = fibs[wordIndex].charAt(i);
      }

      if (!Object.prototype.hasOwnProperty.call(charObj, letterToUse) && !splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letterToUse] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letterToUse] = 'correct')
      }

      if ((!Object.prototype.hasOwnProperty.call(charObj, letterToUse) || charObj[letterToUse] !== 'correct') && solution.indexOf(letter) > -1) {
        //make status present
        return (charObj[letterToUse] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string,
  fib: string
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
