import React, { useState, useEffect } from 'react'
import { Carousel, Description, PageHeader, Socials, UpcomingEvents, VenueLocation, Recommended } from '@/components'
import { PageType } from '@/enums'
import { Venue } from '@/types'
import { formatLocation } from '@/utils';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Head from 'next/head';
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys';
import styles from '../../styles/page.module.css'


const VenueDetail = () => {

  // State
  const [venue, setVenue] = useState<Venue>({} as Venue);
  const [isError, setIsError] = useState<boolean>(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Venue Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${api}/venue/${id}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true })) })
      .catch(() => { setIsError(true) })
  }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      // router.push('/venue');
    }
  }, [isError]);

  // Return
  return (
    <>
      <div className={styles.pageWrapper}>
        <Carousel imageUrls={venue.imageUrls} title={venue.title} />
        <PageHeader
          title={venue.title}
          pageType={PageType.Venue}
          isFeatured={venue.isFeatured}
          subtitle={`${venue.streetAddress}, ${venue.city} ${venue.stateCode} ${venue.postCode}`}
        />
        <Description text={venue.description} types={venue.types} tags={venue.tags} />
        <VenueLocation
          location={formatLocation(venue.streetAddress, venue.city, venue.stateCode, venue.postCode)}
          websiteUrl={venue.websiteUrl}
          phoneNumber={venue.phoneNumber}
          googleMapsEmbedUrl={venue.googleMapsEmbedUrl}
          openingHours={venue.openingHours}
        />
        <UpcomingEvents eventIds={venue.upcomingEventIds} />
        <Socials socials={venue.socials} />
        <Recommended id={venue.venueId} pageType={PageType.Venue} />

      </div>

      <Head>
        {/* Title & Meta */}
        <title>{venue.title ? `Bandwidth | ${venue.title}` : "Bandwidth Venue"}</title>
        <meta
          name="description"
          content={
            venue.description ||
            `${venue.title || "This venue"} in ${venue.city || "Melbourne"} — discover live music, gigs, and events happening here on Bandwidth.`
          }
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta
          property="og:title"
          content={venue.title ? `Bandwidth | ${venue.title}` : "Bandwidth Venue"}
        />
        <meta
          property="og:description"
          content={
            venue.description ||
            `${venue.title || "This venue"} in ${venue.city || "Melbourne"} — discover live music, gigs, and events happening here on Bandwidth.`
          }
        />
        <meta
          property="og:image"
          content={venue.imageUrls?.[0] || "/default-venue.jpg"}
        />
        <meta property="og:type" content="place" />
        <meta
          property="og:url"
          content={`https://bandwidth.melbourne/venue/${venue.venueId || id}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={venue.title ? `Bandwidth | ${venue.title}` : "Bandwidth Venue"}
        />
        <meta
          name="twitter:description"
          content={
            venue.description ||
            `${venue.title || "This venue"} in ${venue.city || "Melbourne"} — discover live music, gigs, and events happening here on Bandwidth.`
          }
        />
        <meta
          name="twitter:image"
          content={venue.imageUrls?.[0] || "/default-venue.jpg"}
        />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link
          rel="canonical"
          href={`https://bandwidth.melbourne/venue/${venue.venueId || id}`}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicVenue",
              name: venue.title,
              image: venue.imageUrls?.[0] || "/default-venue.jpg",
              url: `https://bandwidth.melbourne/venue/${venue.venueId || id}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: venue.streetAddress,
                addressLocality: venue.city,
                addressRegion: venue.stateCode,
                postalCode: venue.postCode,
                addressCountry: "Australia",
              },
              telephone: venue.phoneNumber,
              sameAs: venue.socials || [],
              openingHours: venue.openingHours || undefined,
            }),
          }}
        />
      </Head>

    </>
  );
};

export default VenueDetail;
