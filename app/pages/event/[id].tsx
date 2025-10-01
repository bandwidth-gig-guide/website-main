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
import { Event } from "../../types/Event"
import { PageType } from "@/enums"

// Styling
import styles from "../../styles/page.module.css"

// Utils
import { formatDateLong } from "../../util/formatDateLong";

// Components
import Carousel from "../../components/Carousel/Carousel"
import Description from "../../components/Description/Description"
import FeatureHighlight from "../../components/FeatureHighlight/FeatureHighlight";
import PageHeader from "../../components/PageHeader/PageHeader";
import Socials from "../../components/Socials/Socials";
import PerformanceTimes from "../../components/PerformanceTimes/PerformanceTimes";
import Tickets from "../../components/Tickets/Tickets";
import Recommended from "../../components/Recommended/Recommended";

const EventDetail = () => {

  // State
  const [event, setEvent] = useState<Event | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Event Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${api}/event/${id}`)
      .then(response => { setEvent(camelcaseKeys(response.data, { deep: true })) })
      .catch(() => { setIsError(true) })
  }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      // router.push('/event');
    }
  }, [isError]);

  if (!event) return null;

  const prices = event.prices?.map(price => `${price.ticketType} $${price.price}`).join(" · ") || "";
  const dateTimeLocation = `${formatDateLong(event.startDateTime)} · ${event.venue.title}`;

  const minPrice = event.prices && event.prices.length > 0
    ? Math.min(...event.prices.map(price => price.price))
    : null;

  const items = [
    prices,
    `${event.venue.title} · ${event.venue.stageTitle}`
  ].filter(Boolean);

  // Return
  return (
    <>
      <div className={styles.pageWrapper}>
        <Carousel imageUrls={event.imageUrls} title={event.title} />
        <PageHeader title={event.title} subtitle={dateTimeLocation} pageType={PageType.Event} isFeatured={event.isFeatured} getTicketsUrl={event.ticketSaleUrl} minTicketPrice={minPrice} />
        <PerformanceTimes eventPerformances={event.performances} eventVenue={event.venue} doorsTime={event.startDateTime} />
        <Description text={event.description} types={event.types} tags={event.tags} />
        <Socials socials={event.socials} />
        <Recommended id={event.eventId} pageType={PageType.Event} />
      </div>

      <Head>
        {/* Title & Meta */}
        <title>{event.title ? `Bandwidth | ${event.title}` : "Bandwidth Event"}</title>
        <meta
          name="description"
          content={
            event.description ||
            `${event.title || "Event"} at ${event.venue?.title || "a Melbourne venue"} on ${formatDateLong(event.startDateTime)}. Discover gigs, music, and events on Bandwidth.`
          }
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta
          property="og:title"
          content={event.title ? `Bandwidth | ${event.title}` : "Bandwidth Event"}
        />
        <meta
          property="og:description"
          content={
            event.description ||
            `${event.title || "Event"} at ${event.venue?.title || "a Melbourne venue"} on ${formatDateLong(event.startDateTime)}. Discover gigs, music, and events on Bandwidth.`
          }
        />
        <meta
          property="og:image"
          content={event.imageUrls?.[0] || "/default-event.jpg"}
        />
        <meta property="og:type" content="event" />
        <meta
          property="og:url"
          content={`https://bandwidth.melbourne/event/${event.eventId || id}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={event.title ? `Bandwidth | ${event.title}` : "Bandwidth Event"}
        />
        <meta
          name="twitter:description"
          content={
            event.description ||
            `${event.title || "Event"} at ${event.venue?.title || "a Melbourne venue"} on ${formatDateLong(event.startDateTime)}. Discover gigs, music, and events on Bandwidth.`
          }
        />
        <meta
          name="twitter:image"
          content={event.imageUrls?.[0] || "/default-event.jpg"}
        />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link
          rel="canonical"
          href={`https://bandwidth.melbourne/event/${event.eventId || id}`}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: event.title,
              startDate: event.startDateTime,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: event.venue?.title,
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "VIC",
                  addressCountry: "Australia",
                },
              },
              image: event.imageUrls?.[0] || "/default-event.jpg",
              description: event.description,
              performer: event.performances?.map((p) => ({
                "@type": "MusicGroup",
                name: p.title,
              })),
              offers: event.prices?.map((price) => ({
                "@type": "Offer",
                url: event.ticketSaleUrl,
                price: price.price,
                priceCurrency: "AUD",
                availability: "https://schema.org/InStock",
                validFrom: event.startDateTime,
              })),
              organizer: {
                "@type": "Organization",
                name: "Bandwidth Melbourne",
                url: "https://bandwidth.melbourne",
              },
            }),
          }}
        />
      </Head>

    </>
  );
};

export default EventDetail;
