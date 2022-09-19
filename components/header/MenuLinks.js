import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from '@/services/utilities'
import styles from '@/styles/components/header/MenuLinks.module.scss'

export default function MenuLinks({ links, atTopOfPage, hasHeroImage }) {
  // @todo: Figure out if this linking to /404 is alright to use. Also change in mobile links if needed
  // @todo: update router check to also underline the "blog" menu item while looking at a blog detail page.

  const router = useRouter()

  return (
    <ul className={styles['menu-links']}>
      {links?.map(link => (
        <li key={link.id} className={styles['link']}>
          <Link href={link.page ? link.page : link.url ? link.url : '404'}>
            <a
              className={classNames(
                styles['link-text'],
                (!atTopOfPage || !hasHeroImage) && styles['darken'],
                link.page
                  ? router.asPath + '/' == link.page && styles['active']
                  : router.asPath == link.url && styles['active']
              )}
              target={link.open_in_new_page ? '_blank' : '_self'}
              rel={link.open_in_new_page ? 'noreferrer' : ''}
            >
              {link.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}