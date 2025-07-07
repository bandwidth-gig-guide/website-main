import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Artist } from "../../../types/Artist"
import camelcaseKeys from "camelcase-keys";
import axios from "axios";
import apiUrl from "../../../api.config"
import styles from "./ArtistCard.module.css"

const ArtistCard: React.FC<{ artistId: uuid }> = ({ artistId }) => {
	const [artist, setArtist] = useState<Artist>({} as Artist)

	useEffect(() => {
		axios.get(`${apiUrl}/artist/${artistId}`)
			.then(response => { setArtist(camelcaseKeys(response.data, { deep: true })) })
	}, [artistId]);


	return (
		<div className={styles.wrapper}>
			<Link href={`/artist/${artistId}`}>
			<div className={styles.imgWrapper}>
				<img 
					src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" 
					alt={artist.title} 
				/>
			</div>
			<div>
				<p className={styles.topRow}>{artist.city}, {artist.country}</p>
				<h4>{artist.title}</h4>
				<p className={styles.bottomRow}>? Upcoming Events</p>
			</div>
				
			</Link>
		</div>
	);
};

export default ArtistCard;