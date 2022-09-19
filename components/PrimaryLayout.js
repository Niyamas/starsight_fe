import Meta from '@/components/Meta'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export default function PrimaryLayout({ children, pageProps }) {
	/**
	 * Layout persistency to make the website feel like
	 * an actual SPA: https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
	 * 
	 * Docs: https://nextjs.org/docs/basic-features/layouts
	 * 
	 * @todo: Do we need to style the layout?
	 */

	return (
			<>
				<Meta pageProps={pageProps} />
				<Header />
				<main>{children}</main>
				<Footer />
			</>
	)
}