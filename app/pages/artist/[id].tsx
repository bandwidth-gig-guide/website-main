import React, { useState, useEffect } from 'react'
import { Carousel, Description, Embeds, PageHeader, Socials, UpcomingEvents, Recommended, MetaInfo } from '@/components'
import { PageType } from '@/enums'
import { Artist } from '@/types'
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys';
import styles from '../../styles/page.module.css'

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

      <MetaInfo
        pageType='artist'
        title={artist.title}
        description={`${artist.title} from ${artist.city}, ${artist.country}. ${artist.description?.split('.')[0]}. Discover artists on Bandwidth.`}
        url={`https://bandwidthmelbourne.com/artist/${artist.artistId}`}
        image={artist?.imageUrls?.[0]}
        keywords={[...(artist.tags || []), ...(artist.types || [])]}
        schemaExtensions={{
          artistTitles: [artist.title]
        }}
      />
    </>
  );
};

export default ArtistDetail;
