import Head from 'next/head';
import { useState } from 'react';

import '../styles/global.css';

import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import { LocationScope } from '../types/enums/LocationScope';
import Banner from '../components/Banner/Banner';
import Disclaimer from '../components/Disclaimer/Disclaimer';

function MyApp({ Component, pageProps }: AppProps) {
	const [location, setLocation] = useState<LocationScope>(LocationScope.Melbourne);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
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
