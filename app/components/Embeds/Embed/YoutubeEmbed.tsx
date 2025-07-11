import React from 'react'
import styles from './Embed.module.css'

interface Props {
    embedUrl: string
}

const YoutubeEmbed: React.FC<Props> = ({ embedUrl }) => {
  return (
    <iframe
        className={styles.wrapper}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        loading="lazy"
    />
    )
}

export default YoutubeEmbed