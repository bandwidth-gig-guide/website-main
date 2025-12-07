import { useState } from 'react';
import Head from 'next/head';
import { Header, Footer, Banner, Disclaimer } from '@/components';
import { LocationScope } from '@/enums';
import type { AppProps } from 'next/app';
import '../styles/global.css';


function MyApp({ Component, pageProps }: AppProps) {
	const [location, setLocation] = useState<LocationScope>(LocationScope.Melbourne);

	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
			</Head>

			<div className='app-wrapper'>
				<Header location={location} />
				<main><Component {...pageProps} /></main>
				<Banner />
				<Disclaimer />
				<Footer />
			</div>
		</>
	);
}

export default MyApp;
