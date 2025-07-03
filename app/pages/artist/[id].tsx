import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"

// Config
import apiUrl from "../../api.config"

// Types
import { Artist } from "../../types/Artist"
import { ArtistSocial } from "@/types/Social";


const ArtistDetail = () => {

	// Page States
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	// Objects
	const [artist, setArtist] = useState<Artist>({} as Artist);
	const [artistSocial, setArtistSocial] = useState<ArtistSocial>({} as ArtistSocial);

	// Routing & Params
	const router = useRouter();
	const { id } = router.query;

	// API Calls
	useEffect(() => {
		if (!id) {
			setIsError(true);
			alert("Could not find artist")
			router.push('/artist');
			return;
		}

		const fetchArtist = axios.get(`${apiUrl}/artist/${id}`);
		const fetchArtistSocial = axios.get(`${apiUrl}/artist/social/${id}`);

		Promise.all([fetchArtist, fetchArtistSocial])
			.then(([artistRes, socialRes]) => {
				setArtist(artistRes.data);
				setArtistSocial(socialRes.data);
			})
			.catch(error => {
				console.error(error);
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	if (isError) {
		return (
			<div>
				<p>Could not load artist: {id}</p>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div>
				<p>Loading artist: {id}</p>
			</div>
		)
	}

	return (
		<div>
			<h1>{artist.Title}</h1>
			<p>{JSON.stringify(artist)}</p>
			<p>{JSON.stringify(artistSocial)}</p>
		</div>
	);
};

export default ArtistDetail;
