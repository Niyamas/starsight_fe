import { classNames } from '@/services/utilities'
import styles from '@/styles/components/header/HamHouse.module.scss'

export default function HamHouse({ isMenuOpen, atTopOfPage, hasHeroImage }) {

  return (
    <div className={classNames(
      styles['ham-house'],
      isMenuOpen && styles['open']
    )}>
      <div className={styles['lines']}>
        <span className={classNames(
          styles['line'],
          isMenuOpen && styles['open'],
          (!atTopOfPage || !hasHeroImage) && styles['darken'],
        )} />
        <span className={classNames(
          styles['line'],
          isMenuOpen && styles['open'],
          (!atTopOfPage || !hasHeroImage) && styles['darken'],
        )} />
        <span className={classNames(
          styles['line'],
          isMenuOpen && styles['open'],
          (!atTopOfPage || !hasHeroImage) && styles['darken'],
        )} />
      </div>
    </div>
  )
}