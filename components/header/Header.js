import { useState, useEffect } from 'react'
import Link from 'next/link'
import { classNames } from '@/services/utilities'
import { useMediaQuery } from '@/services/hooks'
import { useGetNavLinksByNameQuery } from '@/services/redux/apiRoutes'
import { useSelector } from 'react-redux'
import MenuLinks from './MenuLinks'
import MobileMenuLinks from './MobileMenuLinks'
import HamHouse from './HamHouse'
import styles from '@/styles/components/header/Header.module.scss'

export default function Header() {

  const hasHeroImage = useSelector(state => state.hasHeroImage.value)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [atTopOfPage, setAtTopOfPage] = useState(true)
  const { data = [], isFetching, isLoading, isError, isSuccess } = useGetNavLinksByNameQuery('main')
  const isDesktop = useMediaQuery('(min-width: 1400px)')

  useEffect(() => {
    window.addEventListener('scroll', updateScrollLocation)

    return () => {
      window.removeEventListener('scroll', updateScrollLocation)
    }
	}, [])

  useEffect(() => {
    isMenuOpen && closeMobileMenu()

	}, [isDesktop])

  function closeMobileMenu() {
		setIsMenuOpen(false)
		document.body.style.overflow = 'unset'
	}

  function toggleMobileMenu() {
		setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)

		// Removes scroll on <body> if the mobile menu is open.
		isMenuOpen
      ? document.body.style.overflow = 'unset'
			: document.body.style.overflow = 'hidden'
	}

  function updateScrollLocation() {
    window.scrollY > 70
      ? setAtTopOfPage(false)
      : setAtTopOfPage(true)
  }

  return (
    <nav className={classNames(
      styles['header'],
      (isMenuOpen || !atTopOfPage || !hasHeroImage) && styles['fill']
    )}>
      <div className={styles['content']}>
        <Link href='/'>
          <a>
            <h1
              className={classNames(
                styles['logo'],
                (isMenuOpen || !atTopOfPage || !hasHeroImage) && styles['darken']
              )}
            >
              Starsight
            </h1>
          </a>
        </Link>

        {isDesktop ? (
          <MenuLinks
            links={data.links}
            atTopOfPage={atTopOfPage}
            hasHeroImage={hasHeroImage}
          />
        ) : (
          <MobileMenuLinks
            links={data.links}
            isMenuOpen={isMenuOpen}
            closeMobileMenu={closeMobileMenu}
          />
        )}

        {!isDesktop && (
          <div className={styles['ham-house-wrapper']} onClick={toggleMobileMenu}>
            <HamHouse
              isMenuOpen={isMenuOpen}
              atTopOfPage={atTopOfPage}
              hasHeroImage={hasHeroImage}
            />
          </div>
        )}
      </div>
    </nav>
  )
}