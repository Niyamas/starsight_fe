import Image from 'next/future/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import sanitizeHtml from 'sanitize-html'
import { classNames } from '@/services/utilities'
import Streamfields from '@/components/Streamfields'
import placeholder from '@/public/images/placeholder.webp'
import styles from '@/styles/pages/ArticleDetailPage.module.scss'

import ArticleHero from '@/components/heroes/ArticleHero'

/* const ArticleHero = dynamic(() => import('../../components/heroes/ArticleHero'), {
  suspense: true,
}) */

export default function ArticleDetailPage({ data }) {

  let articleType = data.meta.type

  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
  console.log('article detail page data:', data)
  console.log('articleType:', articleType)

  return (
    <>
      {articleType === 'articles.BigHeroArticleDetailPage' && (
        <ArticleHero
          src={data.image}
          alt={data.alt}
        />
      )}

      <section className={classNames(
        styles['article-detail-page'],
        articleType === 'articles.BigHeroArticleDetailPage' && styles['no-top-margin']
      )}>
        <div className={classNames(
          styles['post-meta'],
          articleType === 'articles.BigHeroArticleDetailPage' && styles['add-top-margin']
        )}>
          <span className={styles['topic']}>
            {data.topic}
          </span>
          <span className={styles['date']}>
            {new Date(data.meta.first_published_at).toLocaleDateString('en-US', dateOptions)}
          </span>

          <span className={styles['divider']}>
            &nbsp;|&nbsp;
          </span>

          {data.article_authors.map(author => (
            <span className={styles['author']} key={author.id}>
              {author.name}
            </span>
          ))}
        </div>

        <h1>{data.title}</h1>

        {data.preview_text && (
          <div
            className={styles['preview-text']}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.preview_text) }}
          />
        )}

        {articleType === 'articles.ArticleDetailPage' && (
          <div className={styles['image-wrapper']}>
            <Image
              className={classNames(
                styles['image'],
                'image-blur'
              )}
              fill={true}
              src={process.env.NEXT_PUBLIC_BE_DOMAIN + data.image}
              alt={data.alt}
              sizes='1440px'
              placeholder='blur'
              blurDataURL={placeholder.blurDataURL}
              //priority
            />
          </div>
        )}


        {data.caption && (
          <p className={styles['caption']}>
            {data.caption}
          </p>
        )}

        {data?.content && (
          <Streamfields streams={data.content} />
        )}

      </section>
    </>
  )
}

export async function getStaticProps({ params }) {
  // @todo: create repository of fetches and call functions there
  // Remake the redux folder and perhaps put it under services/api
  // as well as additional API function calls.
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/pages/${params.article_detail_slug}/`)
  const data = await response.json()

  return {
    props: {
      data: data
    },
    // Use on-demand static generation
    revalidate: 10,   // ISR: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  }
}

export async function getStaticPaths() {
  // @todo: create a catch-all route
  // @todo: pass only required API fields (slug)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/pages/?type=articles.ArticleDetailPage`)
  const data = await response.json()

  return {
    paths: data.items.map(page => {
      return {
        params: {
          article_detail_slug: page.meta.slug
        }
      }
    }),
    fallback: 'blocking'    // See https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  }
}