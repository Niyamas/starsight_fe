//import { Timeline } from 'react-twitter-widgets'
import HomeHero from '@/components/heroes/HomeHero'
import CurrentObservableComets from '@/components/uncategorized/CurrentObservableComets'
import Apod from '@/components/nasa/APOD'

export default function Home({ data }) {

  //console.log('data:', data)

  return (
    <div>
      <HomeHero
        src={data.hero_image}
        alt={data.hero_image_alt}
      />

      <Apod />

    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/pages/home/`)
  const data = await response.json()

  return {
    props: {
      data
    }, // will be passed to the page component as props
    // Use on-demand static generation
    revalidate: 10,   // ISR: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  }
}