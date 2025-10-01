// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Config
import getConfig from "next/config";

// Types
import { Artist } from "../../types/Artist"
import { PageType } from "../../enums/PageType"

// Styling
import styles from "../../styles/page.module.css"

// Components
import Carousel from "../../components/Carousel/Carousel"
import Description from "../../components/Description/Description"
import Embeds from "../../components/Embeds/Embeds";
import FeatureHighlight from "../../components/FeatureHighlight/FeatureHighlight";
import PageHeader from "../../components/PageHeader/PageHeader";
import Socials from "../../components/Socials/Socials";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import Recommended from "../../components/Recommended/Recommended";


const ArtistDetail = () => {

  // State
  const [artist, setArtist] = useState<Artist>({} as Artist)
  const [isError, setIsError] = useState<boolean>(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Artist Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${api}/artist/${id}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true })) })
      .catch(() => { setIsError(true) })

  }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      // router.push('/Artist');
    }
  }, [isError]);

  const subtitle = `${artist.city}${artist.country ? `, ${artist.country}` : ""} · ${artist.yearFounded ? `Founded ${artist.yearFounded}` : ""}`

  const items = [
    `${artist.city}${artist.country ? `, ${artist.country}` : ""}`,
    artist.yearFounded ? `Founded ${artist.yearFounded}` : ""
  ].filter(Boolean);

  // Return
  return (
    <>
      <div className={styles.pageWrapper}>
        <Carousel imageUrls={artist.imageUrls} title={artist.title} />
        <PageHeader title={artist.title} subtitle={subtitle} pageType={PageType.Artist} isFeatured={artist.isFeatured} />
        <Description text={artist.description} types={artist.types} tags={artist.tags} />
        <Embeds spotifyEmbedUrl={artist.spotifyEmbedUrl} youtubeEmbedUrl={artist.youtubeEmbedUrl} />
        <UpcomingEvents eventIds={artist.upcomingEventIds} />
        <Socials socials={artist.socials} />
        <Recommended id={artist.artistId} pageType={PageType.Artist} />
      </div>

      <Head>
        {/* Title & Meta */}
        <title>{artist.title ? `Bandwidth | ${artist.title}` : "Bandwidth Artist"}</title>
        <meta
          name="description"
          content={
            artist.description ||
            `${artist.title || "Artist"} from ${artist.city || "Melbourne"} ${artist.country ? `(${artist.country})` : ""
            } — discover music, gigs, and events on Bandwidth.`
          }
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta
          property="og:title"
          content={artist.title ? `Bandwidth | ${artist.title}` : "Bandwidth Artist"}
        />
        <meta
          property="og:description"
          content={
            artist.description ||
            `${artist.title || "This artist"} from ${artist.city || "Melbourne"} ${artist.country ? `(${artist.country})` : ""
            } — discover music, gigs, and events on Bandwidth.`
          }
        />
        <meta
          property="og:image"
          content={artist.imageUrls?.[0] || "/default-artist.jpg"}
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content={`https://bandwidth.melbourne/artist/${artist.artistId || id}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={artist.title ? `Bandwidth | ${artist.title}` : "Bandwidth Artist"}
        />
        <meta
          name="twitter:description"
          content={
            artist.description ||
            `${artist.title || "This artist"} from ${artist.city || "Melbourne"} ${artist.country ? `(${artist.country})` : ""
            } — discover music, gigs, and events on Bandwidth.`
          }
        />
        <meta
          name="twitter:image"
          content={artist.imageUrls?.[0] || "/default-artist.jpg"}
        />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link
          rel="canonical"
          href={`https://bandwidth.melbourne/artist/${artist.artistId || id}`}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: artist.title,
              image: artist.imageUrls?.[0] || "/default-artist.jpg",
              url: `https://bandwidth.melbourne/artist/${artist.artistId || id}`,
              sameAs: artist.socials || [],
              genre: artist.tags || [],
              foundingLocation: artist.city
                ? `${artist.city}${artist.country ? `, ${artist.country}` : ""}`
                : undefined,
              foundingDate: artist.yearFounded || undefined,
            }),
          }}
        />
      </Head>
    </>
  );
};

export default ArtistDetail;
