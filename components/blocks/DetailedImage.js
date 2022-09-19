import Image from 'next/future/image'
import { classNames } from '@/services/utilities'
import placeholder from '@/public/images/placeholder.webp'
import styles from '@/styles/components/blocks/articles/DetailedImage.module.scss'

export default function DetailedImage({ data }) {

  return (
    <section className={styles['detailed-image']}>
      {data.title && (
        <h2>
          {data.title}
        </h2>
      )}

      <div className={styles['image-wrapper']}>
        <Image
          className={classNames(
            styles['image'],
            'image-blur'
          )}
          src={process.env.NEXT_PUBLIC_BE_DOMAIN + data.image}
          alt={data.alt}
          fill={true}
          sizes='1440px'
          placeholder='blur'
          blurDataURL={placeholder.blurDataURL}
        />
      </div>


      {data.caption && (
        <p className={styles['caption']}>
          {data.caption}
        </p>
      )}
    </section>
  )
}