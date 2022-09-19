import { useEffect } from 'react'
import Image from 'next/future/image'
import { useDispatch } from 'react-redux'
import { setHeroImageTrue, setHeroImageFalse } from '@/services/redux/global_states/hasHeroImage'
import styles from '@/styles/components/heroes/ArticleHero.module.scss'

export default function ArticleHero({ src, alt }) {

  const dispatch = useDispatch()

  useEffect(() => {

    return () => {
      dispatch(setHeroImageFalse())
    }
  }, [])

  return (
    <div className={styles['article-hero']}>
      <div className={styles['image-wrapper']}>
        <Image
          className={styles['image']}
          fill={true}
          src={process.env.NEXT_PUBLIC_BE_DOMAIN + src}
          alt={alt}
          onLoadingComplete={() => dispatch(setHeroImageTrue())}
          priority
        />
      </div>
    </div>
  )
}