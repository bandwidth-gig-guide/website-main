import { useState } from 'react';
import { Header, Footer, Banner, Disclaimer } from '@/components';
import { LocationScope } from '@/enums';
import type { AppProps } from 'next/app';
import '../styles/global.css';


function MyApp({ Component, pageProps }: AppProps) {
	const [location, setLocation] = useState<LocationScope>(LocationScope.Melbourne);

	return (
		<>
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
