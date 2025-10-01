import Head from 'next/head';
import { useState } from 'react';

import '../styles/global.css';

import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import { LocationScope } from '@/enums';
import Banner from '../components/Banner/Banner';
import Disclaimer from '../components/Disclaimer/Disclaimer';
import SubHeaderMessage from '../components/SubHeaderMessage/SubHeaderMessage';

function MyApp({ Component, pageProps }: AppProps) {
	const [location, setLocation] = useState<LocationScope>(LocationScope.Melbourne);

	return (
		<>
			<div className='app-wrapper'>
				<Header location={location} />
				{/* <SubHeaderMessage /> */}
				<main><Component {...pageProps} /></main>
				<Banner />
				<Disclaimer />
				<Footer />
			</div>

			<Head>
				{/* Global Defaults */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />

				{/* Fallback Title & Description */}
				<title>Bandwidth | Melbourne Gig Guide</title>
				<meta
					name="description"
					content="Discover live music in Melbourne with Bandwidth. Explore upcoming gigs, artists, and venues across the city."
				/>

				{/* Global Open Graph */}
				<meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/default-hero.jpg" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />

				{/* Twitter Defaults */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@BandwidthMelb" />
			</Head>
		</>
	);
}

export default MyApp;
