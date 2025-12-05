import React, { useState, useEffect } from 'react'
import { Carousel, Description, PageHeader, Socials, PerformanceTimes, Recommended, MetaInfo } from '@/components'
import { PageType } from '@/enums'
import { Event } from '@/types'
import { formatDateLong } from '@/utils';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys';
import styles from '../../styles/page.module.css'

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

      <MetaInfo
        pageType="event"
        title={event.title}
        description={`${event.title} at ${event.venue.title}, ${event.startDateTime}. ${event.description?.split('.')[0]}. Discover live music and events in Melbourne's vibrant music scene on Bandwidth.`}
        url={`https://bandwidthmelbourne.com/event/${event.eventId}`}
        image={event.imageUrls?.[0]}
        keywords={[...(event.tags || []), ...(event.types || [])]}
        schemaExtensions={{
          eventStartDate: new Date(event.startDateTime).toISOString(),
          eventPrice: event.prices?.[0]?.price
        }}
      />
    </>
  );
};

export default EventDetail;
