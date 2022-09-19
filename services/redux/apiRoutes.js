import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// @todo: optimize field fetching from API

export const apiRoutes = createApi({
  reducerPath: 'apiRoutes',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_DOMAIN}` }),
  endpoints: (builder) => ({

    getNavLinksByName: builder.query({
      query: (name) => `/navigations/${name}/`,
    }),

    getPageInfo: builder.query({
      query: (pageName) => `/pages/${pageName}/`
    }),

    getArticlePosts: builder.query({
      query: ({offset, limit}) => `/pages/?type=articles.ArticleDetailPage&offset=${offset}&limit=${limit}&fields=_,id,title,preview_text,topic,image,alt,html_url,first_published_at&order=-first_published_at`
    }),

    getApod: builder.query({
      query: () => `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
    }),
    
    // SSD/CNEOS
    getCneos: builder.query({
      query: () => `https://ssd-api.jpl.nasa.gov/cad.api?date-min=2022-01-01&date-max=2100-01-01`
    }),

    // Asteroids - NeoWs
    getAsteroids: builder.query({
      query: () => `https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
    }),

    // Sentry: Earth Impact Monitoring
    getSentry: builder.query({
      query: () => `https://ssd-api.jpl.nasa.gov/sentry.api`
    }),
    
  }),
})

/* 
  useFetchTextQuery is an auto-generated hook that
  lets you fetch the data, and can also return an
  "isFetching" state variable that lets you show
  a loading spinner or another note while the data
  is fetching. The name is dependent on the variable
  name on line 17 (fetchText in this example).
*/
export const {
  useGetNavLinksByNameQuery,
  useGetPageInfoQuery,
  useGetArticlePostsQuery,
  useGetApodQuery,
  useGetCneosQuery,
  useGetAsteroidsQuery,
  useGetSentryQuery,
} = apiRoutes