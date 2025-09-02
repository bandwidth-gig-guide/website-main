// React / Next
import React from "react"
import Head from 'next/head';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Hero from "../../components/Hero/Hero";


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
        <p>under development...</p>
      </div>
    </>
  );
};

export default Venue;
