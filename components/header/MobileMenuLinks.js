import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from '@/services/utilities'
import styles from '@/styles/components/header/MobileMenuLinks.module.scss'

export default function MobileMenuLinks({
  links,
  isMenuOpen,
  closeMobileMenu
}) {
  // @todo: Add socials and donate button here

  const router = useRouter()

  return (
    <div
      className={classNames(
        styles['mobile-menu-links'],
        isMenuOpen && styles['open']
      )}
    >
      <ul>
        {links?.map(link => (
          <li
            key={link.id}
            className={classNames(
              styles['link'],
              isMenuOpen && styles['open']
            )}
          >
            <Link href={link.page ? link.page : link.url ? link.url : '404'}>
              <a
                className={classNames(
                  link.page
                  ? router.asPath + '/' == link.page && styles['active']
                  : router.asPath == link.url && styles['active']
                )}
                onClick={closeMobileMenu}
                target={link.open_in_new_page ? '_blank' : '_self'}
                rel={link.open_in_new_page ? 'noreferrer' : ''}
              >
                <span>
                  {link.title}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}