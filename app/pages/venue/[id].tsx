// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from "../../api.config"

// Custom
import { Venue } from "../../types/models/Venue"
import { PageType } from "../../types/enums/PageType"

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
import VenueLocation from "../../components/VenueLocation/VenueLocation";
import { formatLocation } from "../../util/formatLocation";
import Recommended from "../../components/Recommended/Recommended";


const VenueDetail = () => {

  // State
  const [venue, setVenue] = useState<Venue>({} as Venue); 
  const [isError, setIsError] = useState<boolean>(false);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Venue Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${apiUrl}/venue/${id}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})
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
      <Head>
        <title>Bandwidth | {venue.title}</title>
        <meta name="description" content="" />
      </Head>

      <div className={styles.pageWrapper}>
        <Carousel imageUrls={venue.imageUrls} title={venue.title}/>
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
    </>
  );
};

export default VenueDetail;
