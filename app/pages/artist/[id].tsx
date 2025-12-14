import React, { useState, useEffect } from 'react'
import getConfig from 'next/config';
import { Carousel, Description, Embeds, PageHeader, Socials, UpcomingEvents, Recommended, MetaInfo } from '@/components'
import { PageType } from '@/enums'
import { Artist } from '@/types'
import { useRouter } from 'next/router';
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys';
import styles from '../../styles/page.module.css'

const ArtistDetail = () => {
  const [artist, setArtist] = useState<Artist>({} as Artist)
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  const router = useRouter();
  const { id } = router.query;


  useEffect(() => {
    if (id === undefined) return;

    axios.get(`${api}/artist/${id}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true })) })
      .then(() => { setIsLoaded(true) })
      .catch(() => { router.push('/'); })
  }, [id]);


  const subtitle = (
    artist.isResearched
      ? `${artist.city}${artist.country ? `, ${artist.country}` : ""} · ${artist.yearFounded ? `Founded ${artist.yearFounded}` : ""}`
      : [
        "Stay tuned for more info!",
        "More details coming soon!",
        "We're working on this profile!",
        "Check back later for updates!",
        "Artist info in progress...",
        "Coming soon to Bandwidth!",
        "We're researching this artist!",
        "Profile under construction!",
        "More info on the way!",
        "Artist details coming soon!",
        "We're building this profile!",
        "Information coming shortly!",
        "Profile in development!",
        "Research in progress!",
        "Details to follow soon!"
      ][Math.floor(Math.random() * 15)]
  )

  const description = (
    artist.isResearched
      ? artist.description
      : `We really don't know what to say about ${artist.title} yet...\n\n` +
        `It takes us around 10 minutes to research each artist - which means a single gig could take around 30 to 40 minutes to research, which just isn't viable for use at this stage. Our research techniques and processes will get better over time, but, unfortunately, for now we simply don't have the bandwidth to give artists like ${artist.title} the love that they deserve. We strongly recommended that you check them out elsewhere if you think that they might be a vibe.\n\n` +
        `Once we have the time and manpower, we'll be coming back to all the artists we've missed and complete the research to give them a proper profile page. Thanks for bearing with us in the meantime!`
  )

  if (isLoaded) return (
    <>
      <div className={styles.pageWrapper}>
        <Carousel imageUrls={artist.imageUrls} title={artist.title} />
        <PageHeader title={artist.title} subtitle={subtitle} pageType={PageType.Artist} isFeatured={artist.isFeatured} />
        <Description text={description} types={artist.types} tags={artist.tags} />
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
