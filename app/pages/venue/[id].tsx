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
  const [venue, setVenue] = useState<Venue>({} as Venue);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  const router = useRouter();
  const { id } = router.query;

  
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${api}/venue/${id}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true })) })
      .then(() => { setIsLoaded(true) })
      .catch(() => { router.push('/'); })
  }, [id]);


  if (isLoaded) return (
    <>
      <div className={styles.pageWrapper}>
        <Carousel imageUrls={venue.imageUrls} title={venue.title} />
        <PageHeader
          title={venue.title}
          pageType={PageType.Venue}
          isFeatured={venue.isFeatured}
          subtitle={`${venue.streetAddress}, ${venue.city} ${venue.stateCode} ${venue.postCode}`}
        />
        <Description text={venue.description} types={venue.types}  />
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

      <MetaInfo
        pageType="venue"
        title={venue.title}
        description={`${venue.title} in ${venue.city}. ${venue.description?.split('.')[0]}. Discover live music venues putting on gigs, events, and concerts in Melbourne's vibrant music scene on Bandwidth.`}
        url={`https://bandwidthmelbourne.com/venue/${venue.venueId}`}
        image={venue.imageUrls?.[0]}
        keywords={venue.types}
        schemaExtensions={{
          venueName: venue.title,
          venueAddress: formatLocation(venue.streetAddress, venue.city, venue.stateCode, venue.postCode),
          googleMapsEmbed: venue?.googleMapsEmbedUrl
        }}
      />
    </>
  );
};

export default VenueDetail;
