import { classNames } from '@/services/utilities'
import styles from '@/styles/components/utilities/PlusMinusToggle.module.scss'

export default function PlusMinusToggle({ isOpen }) {

  return (
    <div className={styles['plus-minus-toggle']}>
      <div
        className={classNames(
          styles['horizontal-line'],
          isOpen && styles['rotate-and-fade']
        )}
      />
      <div className={classNames(
        styles['vertical-line'],
        isOpen && styles['rotate']
      )}
      />
    </div>
  )
}