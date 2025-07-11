import React from 'react'
import styles from './Embed.module.css'

interface Props {
    embedUrl: string
}

const SpotifyEmbed: React.FC<Props> = ({ embedUrl }) => {
  return (
    <iframe 
        className={styles.wrapper}
        data-testid="embed-iframe" 
        src={embedUrl}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
    />
    )
}

export default SpotifyEmbed