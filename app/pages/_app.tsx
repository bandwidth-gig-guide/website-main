import Head from 'next/head';
import { useState } from 'react';

import '../styles/global.css';

import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import { LocationScope } from '../types/enums/LocationScope';

function MyApp({ Component, pageProps }: AppProps) {

    const [location, setLocation] = useState<LocationScope>(LocationScope.Melbourne);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>
            <div className='app-wrapper'>
                <Header location={location} setLocation={setLocation} />
                <main><Component {...pageProps} /></main>
                <Footer />
            </div>
        </>
    );
}

export default MyApp;
