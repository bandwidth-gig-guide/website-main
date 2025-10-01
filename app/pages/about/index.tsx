// React / Next
import React from "react"
import Head from 'next/head';
import { SectionHeader, Hero } from '@/components';

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
