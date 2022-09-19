import { useState, useEffect } from 'react'
import Image from 'next/future/image'
//import { BE_DOMAIN } from '@/config/index'
import classNames from '@/services/utilities/classNames'
import { useGetApodQuery } from '@/services/redux/apiRoutes'
import placeholder from '@/public/images/placeholder.webp'
import styles from '@/styles/components/nasa/Apod.module.scss'

export default function Apod() {

  const { data = [], isFetching, isLoading, error, isSuccess } = useGetApodQuery()

  //console.log('isSuccess:', isSuccess)
  //console.log('APOD API data:', data)
  //console.log('APOD default values:', defaults)

  let date = new Date()
  let options = { year:'numeric', month:'long', day:'numeric' }
  let dateTimeNow = date.toLocaleDateString('en-US', options)

  return (
    <div className={styles['apod']}>
      <h2 className={styles['header']}>ASTRONOMY PICTURE OF THE DAY</h2>
      <a
        className={styles['image-link']}
        href='https://apod.nasa.gov/apod/astropix.html'
        target='_blank'
        rel='noreferrer'
      >
        <div className={styles['image-wrapper']}>
          {isSuccess && (
            <Image
              className={classNames(
                styles['image'],
                'image-blur'
              )}
              src={data.url}
              alt={data.title}
              fill={true}
              placeholder='blur'
              blurDataURL={placeholder.blurDataURL}
            />
          )}

          {/* {error && (
            <Image
              className={styles['image']}
              src={BE_DOMAIN+defaults.default_image}
              alt={data.default_image_alt}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              blurDataURL={placeholder.blurDataURL}
            />
          )} */}
        </div>
      </a>

      <h4 className={styles['title']}>
        {data.title}
      </h4>

      <div className={styles['subtitle']}>
        <span className={styles['credits']}>
          by&nbsp;
          {data.copyright}
          &nbsp;&nbsp;
        </span>

        <span className={styles['date']}>
          {dateTimeNow}
        </span>
      </div>


      {/* <div
        className={styles['description']}
        dangerouslySetInnerHTML={{ __html: defaults.default_text }}
      >
      </div>
      <span className={styles['read-more-button']}>Read more</span> */}
    </div>
  )
}