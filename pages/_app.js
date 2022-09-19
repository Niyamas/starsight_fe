import { Provider } from 'react-redux'
import { store } from '@/services/redux/store'
import PrimaryLayout from '@/components/PrimaryLayout'
import '@/styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PrimaryLayout pageProps={pageProps}>
        <Component {...pageProps} />
      </PrimaryLayout>
    </Provider>
  )
}

export default MyApp
