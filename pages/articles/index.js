import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/future/image'
import sanitizeHtml from 'sanitize-html'
import { classNames } from '@/services/utilities'
import { useGetArticlePostsQuery } from '@/services/redux/apiRoutes'
import { LoadingSpinner } from '@/components/utilities'
//import { throttle } from '@/services/utilities'
import placeholder from '@/public/images/placeholder.webp'
import styles from '@/styles/pages/ArticleListingPage.module.scss'

export default function ArticleListingPage({ data }) {

  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
  const observerOptions = { root: null, threshold: 0, rootMargin: '-75% 0% 0% 0%'}
  const initialPostsPerPage = 6
  const postsToFetch = 3
  const [offset, setOffset] = useState(initialPostsPerPage - postsToFetch)
  const [posts, setPosts] = useState(data.front_page_article_posts)
  const observer = useRef()
  const timestampRef = useRef(Date.now()).current
  const { data: morePosts = [], isSuccess, isFetching } = useGetArticlePostsQuery(
    {offset: offset, limit: postsToFetch, sessionId: timestampRef},
    {skip: offset === initialPostsPerPage - postsToFetch}
  )

  const maxOffset = useMemo(() => {
    let postQuotient = Math.floor(data.total_post_number / postsToFetch)       // Number of pages (6 articles per page)
    let postRemainder = data.total_post_number % postsToFetch                  // If multiples of 6 can't be reached, will show remainder of posts in the very last page

    // Account for not fetching the first 6 posts. Calculate the max number of pages, then convert it to offset
    if (postQuotient > 0 && postRemainder > 0) {
      // If there are more than 6 articles and there are a remainder of articles,
      // add the correct number of pages, which is one more than the postQuotient
      // to account for the article spillover to the next page.
      return postQuotient * postsToFetch
    }
    else if (postQuotient > 0 && postRemainder === 0) {
      // More than 6 articles and no remainder articles means that there all of the
      // fetched articles are multiples of 6, which is a perfect fit for the pages.
      return (postQuotient * postsToFetch) - postsToFetch
    }
    else if (postQuotient === 0 && postRemainder > 0) {  
      return 0
    }
    else {
      // All other variances means that there's no articles (i.e. no pages)
      return 0
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setPosts(prevPosts => {
        return [prevPosts, morePosts.items].flat()
      })
    }
  }, [isFetching])

  const postsRef = useCallback((node) => {
    // Inspiration from: https://www.youtube.com/watch?v=NZKUirTtxcg
    if (isFetching) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {

      // If at bottom of posts, fetch more posts
      if (!entries[0].isIntersecting && offset < maxOffset) {
        nextPage()
      }
    }, observerOptions)
    if (node) observer.current.observe(node)
  }, [isFetching])

  function nextPage() {
    offset < maxOffset && setOffset(prevOffset => prevOffset + postsToFetch)
  }

  console.log('data:', data)

  return (
    <div className={styles['article-listing-page']}>
      <section
        className={styles['posts']}
        ref={postsRef}
      >
        {posts?.map(post => (
          <article
            key={post.id}
            className={styles['post']}
          >
            <div className={styles['topic-and-date']}>
              <span className={styles['topic']}>
                {post.topic}
              </span>
              <span className={styles['date']}>
                {new Date(post.meta.first_published_at).toLocaleDateString('en-US', dateOptions)}
              </span>
            </div>
            <Link href={post.meta.html_url ? post.meta.html_url : '404'}>
              <a>
                <div className={styles['image-wrapper']}>
                  <Image
                    className={classNames(
                      styles['image'],
                      'image-blur'
                    )}
                    fill={true}
                    src={process.env.NEXT_PUBLIC_BE_DOMAIN + post.image}
                    alt={post.alt}
                    sizes='710px'
                    placeholder='blur'
                    blurDataURL={placeholder.blurDataURL}
                  />
                </div>
 
                <h2 className={styles['title']}>
                  {post.title}
                </h2>
                <div
                  className={styles['preview-text']}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.preview_text) }}
                />
              </a>
            </Link>
          </article>
        ))}        
      </section>

      {isFetching && (
        <div className={styles['loading-spinner']}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  // @todo: create repository of fetches and call functions there
  // Remake the redux folder and perhaps put it under services/api
  // as well as additional API function calls.
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/pages/articles/`)
  const data = await response.json()

  return {
    props: {
      data: data
    },
    // Use on-demand static generation
    revalidate: 10,   // ISR: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  }
}