import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  solution: string
  guesses: string[]
  fibs: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
  showHint: (index: number) => void
  isDaily: boolean
}

export const Grid = ({
  solution,
  guesses,
  fibs,
  currentGuess,
  isRevealing,
  currentRowClassName,
  showHint,
  isDaily
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          fib={fibs[i]}
          isRevealing={isRevealing && guesses.length - 1 === i}
          showHint={showHint}
          index={i}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} isDaily={isDaily} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} solution={solution} />
      ))}
    </>
  )
}
