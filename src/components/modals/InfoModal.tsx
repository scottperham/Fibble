import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries. After each guess, the word you guessed will change to something random and the color of the tiles will
        change to show how close your original guess was to the word. Confusing? Yes! But you'll get the hang of it.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">An example might help... let's say the solution is WHALE and your first guess is WEARY.</p>

      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        Once entered, this might change to STOKE but the S and O will be green denoting that the W and A in your original guess was in the correct spot and the T would turn yellow denoting that the E in your original guess was in the word but in the wrong spot.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="S"
          status="correct"
        />
        <Cell value="T" isCompleted={true} status='present' isRevealing={true} />
        <Cell value="O" isCompleted={true} status='correct' isRevealing={true} />
        <Cell value="K" isCompleted={true} />
        <Cell value="E" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        Also note that the K and E from STOKE remained white. This is because the R and Y from your original guess were not in the solution.
        Basically, the interface is fibbing to you! Got it? Great! Now go play!
      </p>
    </BaseModal>
  )
}
