import React from 'react'
import { SectionHeader, Hero } from '@/components';
import Head from 'next/head';


const Venue = () => {

  return (
    <>
      <Head>
        <title>Bandwidth | About</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <Hero />
        <SectionHeader title="About Us" />
        <p>...</p>
      </div>
    </>
  );
};

export default Venue;
