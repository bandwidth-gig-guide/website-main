// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from "../../api.config"

// Types
import { Event } from "../../types/models/Event"
import { PageType } from "../../types/enums/PageType"

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

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Event Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${apiUrl}/event/${id}`)
      .then(response => { setEvent(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})
    }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      // router.push('/event');
    }
  }, [isError]);

  if (!event) return null;
  
  const items = [
    `${formatDateLong(event.startDateTime)}`,
    `${event.venue.title} · ${event.venue.stageTitle}`
  ].filter(Boolean);

  // Return
  return (
    <>
      <Head>
        <title>Bandwidth | {event.title}</title>
        <meta name="description" content="" />
      </Head>

      <div className={styles.pageWrapper}>
        <Carousel imageUrls={event.imageUrls} title={event.title}/>
        <PageHeader title={event.title} pageType={PageType.Event} isFeatured={event.isFeatured}/>
        <FeatureHighlight items={items} />
        <Description text={event.description} types={event.types} tags={event.tags} />
        <PerformanceTimes eventPerformances={event.performances} eventVenue={event.venue} doorsTime={event.startDateTime} />
        <Tickets prices={event.prices} ticketSaleUrl={event.ticketSaleUrl} originalPostUrl={event.originalPostUrl} />
        <Socials socials={event.socials} />
        <Recommended id={event.eventId} pageType={PageType.Event} />
      </div>
    </>
  );
};

export default EventDetail;
