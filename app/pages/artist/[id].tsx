import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"

// Config
import apiUrl from "../../api.config";

// Types
import { Artist } from "../../types/Artist";
import { ArtistSocial } from "../../types/Social";
import { ArtistType } from "../../types/Type";
import { ArtistTag } from "../../types/Tag";
import { ArtistImage } from "../../types/Image";


const ArtistDetail = () => {

	// Page States
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	// Objects
	const [artist, setArtist] = useState<Artist>({} as Artist);
	const [artistSocial, setArtistSocial] = useState<ArtistSocial>({} as ArtistSocial);
	const [artistType, setArtistType] = useState<ArtistType>({} as ArtistType);
	const [artistTag, setArtistTag] = useState<ArtistTag>({} as ArtistTag);
	const [artistImage, setArtistImage] = useState<ArtistImage>({} as ArtistImage);


	// Routing & Params
	const router = useRouter();
	const { id } = router.query;

	// API Calls
	useEffect(() => {
		if (!id) {
			setIsError(true);
			alert("Could not find artist")
			// router.push('/artist');
			return;
		}

		const fetchArtist = axios.get(`${apiUrl}/artist/${id}`);
		const fetchArtistSocial = axios.get(`${apiUrl}/artist/social/${id}`);
		const fetchArtistType = axios.get(`${apiUrl}/artist/type/${id}`);
		const fetchArtistTag = axios.get(`${apiUrl}/artist/tag/${id}`);
		const fetchArtistImage = axios.get(`${apiUrl}/artist/image/${id}`);


		Promise.all([fetchArtist, fetchArtistSocial, fetchArtistType, fetchArtistTag, fetchArtistImage])
			.then(([resArtist, resArtistSocial, resArtistType, resArtistTag, resArtistImage]) => {
				setArtist(resArtist.data);
				setArtistSocial(resArtistSocial.data);
				setArtistType(resArtistType.data);
				setArtistTag(resArtistTag.data);
				setArtistImage(resArtistImage.data);
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
			<p><strong>Artist:</strong> {JSON.stringify(artist)}</p>
			<p><strong>ArtistSocial:</strong> {JSON.stringify(artistSocial)}</p>
			<p><strong>ArtistType:</strong> {JSON.stringify(artistType)}</p>
			<p><strong>ArtistTag:</strong> {JSON.stringify(artistTag)}</p>
			<p><strong>ArtistImage:</strong> {JSON.stringify(artistImage)}</p>
		</div>
	);
};

export default ArtistDetail;
