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
import { Artist } from "../../types/models/Artist"
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
import Recommended from "../../components/Recommended/Recommended";


const ArtistDetail = () => {

  // State
  const [artist, setArtist] = useState<Artist>({} as Artist)
  const [isError, setIsError] = useState<boolean>(false);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Artist Details
  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${apiUrl}/artist/${id}`)
         .then(response => { setArtist(camelcaseKeys(response.data, { deep: true }))})
         .catch(() => { setIsError(true)})

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
      <Head>
        <title>Bandwidth | {artist.title}</title>
        <meta name="description" content="" />
      </Head>

      <div className={styles.pageWrapper}>
        <Carousel imageUrls={artist.imageUrls} title={artist.title}/>
        <PageHeader title={artist.title} subtitle={subtitle} pageType={PageType.Artist} isFeatured={artist.isFeatured}/>
        {/* <FeatureHighlight items={items} /> */}
        <Description text={artist.description} types={artist.types} tags={artist.tags} />
        <Embeds spotifyEmbedUrl={artist.spotifyEmbedUrl} youtubeEmbedUrl={artist.youtubeEmbedUrl} />
        <UpcomingEvents eventIds={artist.upcomingEventIds} />
        <Socials socials={artist.socials} />
        <Recommended id={artist.artistId} pageType={PageType.Artist} />
      </div>
    </>
  );
};

export default ArtistDetail;
