import { useEffect } from 'react'
import Image from 'next/future/image'
import { useDispatch } from 'react-redux'
import { setHeroImageTrue, setHeroImageFalse } from '@/services/redux/global_states/hasHeroImage'
import { classNames } from '@/services/utilities'
import styles from '@/styles/components/heroes/HomeHero.module.scss'

export default function HomeHero({ src, alt }) {

  const dispatch = useDispatch()

  useEffect(() => {
    //dispatch(setHeroImageTrue())

    return () => {
      dispatch(setHeroImageFalse())
    }
  }, [])

  return (
    <div className={styles['home-hero']}>
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

      <p className={classNames(
        styles['text-left'],
        'no-select'
      )}>
        Some of these stars may not exist as stars anymore...
        <br/>
        but their lights still echo forth through the cosmos
      </p>
      <p className={classNames(
        styles['text-right'],
        'no-select'
      )}>
        Shine
        <br/>
        Bright
      </p>
    </div>
  )
}