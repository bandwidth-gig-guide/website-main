import React from 'react';
import styles from './Embeds.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import SpotifyEmbed from './Embed/SpotifyEmbed';
import YoutubeEmbed from './Embed/YoutubeEmbed';

interface Props {
  spotifyEmbedUrl?: string,
  youtubeEmbedUrl?: string
}

const Embeds: React.FC<Props> = ({ spotifyEmbedUrl, youtubeEmbedUrl }) => {

  if (!spotifyEmbedUrl && !youtubeEmbedUrl) return

  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Check Them Out' />
        <div className={styles.embedContainer}>
          {spotifyEmbedUrl && ( <SpotifyEmbed embedUrl={spotifyEmbedUrl} /> )}
          {youtubeEmbedUrl && ( <YoutubeEmbed embedUrl={youtubeEmbedUrl} />)}
        </div>
    </div>
  );
};

export default Embeds;