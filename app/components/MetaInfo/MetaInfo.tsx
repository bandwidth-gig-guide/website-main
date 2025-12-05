import React from "react";
import Head from "next/head";
import { Props } from "./interfaces";
import { buildInfo } from "./utils/buildInfo";

const MetaInfo: React.FC<Props> = (props) => {
  const info = buildInfo(props);

  return (
    <Head>
      {/* Preload */}
      <link rel="preload" as="image" href={props.image || "/default-og.png"} />

      {/* Meta */}
      <title>{info.titleTag}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={info.mergedKeywords} />
      <meta name="robots" content={info.robots} />
      <link rel="canonical" href={props.url} />

      {/* OpenGraph */}
      <meta property="og:site_name" content={info.openGraph.siteName} />
      <meta property="og:title" content={info.openGraph.title} />
      <meta property="og:description" content={info.openGraph.description} />
      <meta property="og:image" content={info.openGraph.image} />
      <meta property="og:image:alt" content={info.openGraph.imageAlt} />
      <meta property="og:type" content={info.ogType} />
      <meta property="og:url" content={info.openGraph.url} />

      {/* Twitter */}
      <meta name="twitter:card" content={info.twitter.card} />
      <meta name="twitter:title" content={info.twitter.title} />
      <meta name="twitter:description" content={info.twitter.description} />
      <meta name="twitter:image" content={info.twitter.image} />
      <meta name="twitter:image:alt" content={info.twitter.imageAlt} />
      <meta name="twitter:site" content={info.twitter.site} />

      {/* JSON-LD */}
      {info.jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
    </Head>
  );
};

export default MetaInfo;
