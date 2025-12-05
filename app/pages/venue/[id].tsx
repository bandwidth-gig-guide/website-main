import React, { useState, useEffect } from 'react'
import { Carousel, Description, PageHeader, Socials, UpcomingEvents, VenueLocation, Recommended, MetaInfo } from '@/components'
import { PageType } from '@/enums'
import { Venue } from '@/types'
import { formatLocation } from '@/utils';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys';
import styles from '../../styles/page.module.css'


const VenueDetail = () => {

  // State
  const [venue, setVenue] = useState<Venue>({} as Venue);
  const [location, setLocation] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Venue Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${api}/venue/${id}`)
      .then(response => { 
        setVenue(camelcaseKeys(response.data, { deep: true })),
        setLocation(formatLocation(venue.streetAddress, venue.city, venue.stateCode, venue.postCode))
      })
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
          location={location}
          websiteUrl={venue.websiteUrl}
          phoneNumber={venue.phoneNumber}
          googleMapsEmbedUrl={venue.googleMapsEmbedUrl}
          openingHours={venue.openingHours}
        />
        <UpcomingEvents eventIds={venue.upcomingEventIds} />
        <Socials socials={venue.socials} />
        <Recommended id={venue.venueId} pageType={PageType.Venue} />
      </div>

      <MetaInfo
        pageType="venue"
        title={venue.title}
        description={`${venue.title} in ${venue.city}. ${venue.description?.split('.')[0]}. Discover live music venues putting on gigs, events, and concerts in Melbourne's vibrant music scene on Bandwidth.`}
        url={`https://bandwidthmelbourne.com/venue/${venue.venueId}`}
        image={venue.imageUrls?.[0]}
        keywords={[...(venue.tags || []), ...(venue.types || [])]}
        schemaExtensions={{
          venueName: venue.title,
          venueAddress: location,
          googleMapsEmbed: venue?.googleMapsEmbedUrl
        }}
      />
    </>
  );
};

export default VenueDetail;
