import React from 'react'
import { SectionHeader, Hero, MetaInfo } from '@/components';


const Venue = () => {

  return (
    <>
      <div>
        <Hero />
        <SectionHeader title="About Us" />
        <p>...</p>
      </div>

      <MetaInfo
        pageType="about"
        title="About Bandwidth Melbourne - Supporting Local Music Artists"
        description="Learn about Bandwidth Melbourne's mission to connect local artists with venues and audiences. Discover how we're building Melbourne's music community and supporting emerging talent."
        url="https://bandwidthmelbourne.com/about"
      />
    </>
  );
};

export default Venue;
