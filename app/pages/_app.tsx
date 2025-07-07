import Head from 'next/head'

import '../styles/global.css';

import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>
            <div className='app-wrapper'>
                <Header />
                <main><Component {...pageProps} /></main>
                <Footer />
            </div>
        </>
    );
}

export default MyApp;
