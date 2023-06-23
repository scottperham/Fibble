import { getGuessStatuses } from '../../lib/statuses'
import { unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  solution: string
  guess: string
  fib: string
  isRevealing?: boolean
  showHint: (index: number) => void
  index: number
}

export const CompletedRow = ({ solution, guess, fib, isRevealing, showHint, index }: Props) => {
  const statuses = getGuessStatuses(solution, guess, fib)

  let splitChars;

  if (solution === guess) {
    splitChars = unicodeSplit(guess)
  }
  else {
    splitChars = unicodeSplit(fib)
  }

  return (
    <div className="mb-1 flex justify-center">
      {splitChars.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
      {/* <button onClick={() => showHint(index)}>Hint</button> */}
    </div>
  )
}
