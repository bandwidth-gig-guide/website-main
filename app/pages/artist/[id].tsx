// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Artist } from "../../types/Artist"
import { ArtistSocial } from "../../types/Social"
import { FeaturedCheck } from "../../types/FeaturedCheck";
import Carousel from "../../components/Carousel/Carousel"
import PageHeader from "../../components/PageHeader/PageHeader";
import { PageType } from "../../types/enums/PageType"
import Description from "../../components/Description/Description"
import FeatureHighlight from "../../components/FeatureHighlight/FeatureHighlight";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import Socials from "../../components/Socials/Socials";
import Embeds from "../../components/Embeds/Embeds";
import Comments from "../../components/Comments/Comments";
import Chips from "../../components/Chips/Chips";


const ArtistDetail = () => {

  // State
  const [artist, setArtist] = useState<Artist>({} as Artist); 
  const [tags, setTags] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [socials, setSocials] = useState<ArtistSocial[]>([]);
  const [isFeatured, setIsFeatured] = useState<FeaturedCheck>({} as FeaturedCheck);
  const [isError, setIsError] = useState<boolean>(false);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Artist Details
  useEffect(() => {
    if (!id) return;

    axios.get(`${apiUrl}/artist/${id}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})

    axios.get(`${apiUrl}/artist/tag/${id}`)
      .then(response => { setTags(response.data) })
      .catch(() => { setIsError(true)})

    axios.get(`${apiUrl}/artist/type/${id}`)
      .then(response => { setTypes(response.data) })
      .catch(() => { setIsError(true)})

    axios.get(`${apiUrl}/artist/social/${id}`)
      .then(response => { setSocials(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})

    axios.get(`${apiUrl}/artist/featured/${id}`)
      .then(response => { setIsFeatured(response.data) })
      .catch(() => { setIsError(true)})

    }, [id]);

    

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      router.push('/Artist');
    }
  }, [isError]);

  const items = [
    `${artist.city}${artist.country ? `, ${artist.country}` : ""}`, // E.g., Melbourne, Australia
    artist.yearFounded ? `Founded ${artist.yearFounded}` : "" // E.g., Founded 2019
  ].filter(Boolean);
  
  // Return
  return (
    <>
      <Head>
        <title>Bandwidth | {artist.title}</title>
        <meta name="description" content="" />
      </Head>
      <div>
        <Carousel />
        <PageHeader title={artist.title} pageType={PageType.Artist} isFeatured={isFeatured.isFeatured}/>
        <FeatureHighlight items={items} />
        <Description text={artist.description} />
        <Chips tags={tags} types={types} />
        <UpcomingEvents artistId={artist.artistId} />
        <Socials socials={socials} />
        <Embeds artistId={artist.artistId} />
        <Comments artistId={artist.artistId} />
      </div>
    </>
  );
};

export default ArtistDetail;
