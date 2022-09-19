
import Link from 'next/link'
import { useGetNavLinksByNameQuery } from '@/services/redux/apiRoutes'
import styles from '@/styles/components/footer/Footer.module.scss'

export default function Footer() {

  const { data: navLinks = [] } = useGetNavLinksByNameQuery('main')

  return (
    <footer className={styles['footer']}>
      <Link href='/'>
        <a className={styles['logo']}>
          Starsight
        </a>
      </Link>

      <ul className={styles['links']}>
        {navLinks?.links?.map(link => (
          <li
            key={link.title}
            className={styles['link']}
          >
            <Link href={link.page ? link.page : link.url ? link.url : '404'}>
              <a
                className={styles['link-text']}
                target={link.open_in_new_page ? '_blank' : '_self'}
                rel={link.open_in_new_page ? 'noreferrer' : ''}
              >
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}