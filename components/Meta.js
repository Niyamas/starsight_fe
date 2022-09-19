import Head from 'next/head'

export default function Meta({ pageProps, keywords }) {

  let title
  let description

  Boolean(pageProps?.data?.meta?.seo_title)
    ? title = pageProps?.data?.meta?.seo_title
    : title = pageProps?.data?.title

  Boolean(pageProps?.data?.meta?.search_description)
    ? description = pageProps?.data?.meta?.search_description
    : description = 'Starsight sheds light on news very far from home.'

  return (

    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='Description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title ? `Starsight | ${title}` : 'Starsight'}</title>
    </Head>
  )
}