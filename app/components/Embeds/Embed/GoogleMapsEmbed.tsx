import React from 'react'
import styles from './Embed.module.css'

interface Props {
	embedUrl: string
}

const GoogleMapsEmbed: React.FC<Props> = ({ embedUrl }) => {
	return (
		<iframe 
			className={styles.wrapper}
			src={embedUrl} 
			loading='lazy'
			/>
	)
}

export default GoogleMapsEmbed