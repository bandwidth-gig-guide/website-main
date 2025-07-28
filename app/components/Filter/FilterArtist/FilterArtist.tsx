import React, { useEffect, useState } from 'react';
import styles from './FilterArtist.module.css'
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import apiUrl from '../../../api.config';
import {
	FILTER_TAGS_KEY,
	FILTER_ARTIST_TYPE_KEY,
	FILTER_ARTIST_NAME_KEY,
	FILTER_ARTIST_CITY_KEY,
	FILTER_ARTIST_COUNTRY_KEY,
	FILTER_ARTIST_UPCOMING_KEY
} from '../../../constants/localstorage';
import { ARTIST_TYPES } from '../../../constants/artistTypes';
import { TAGS } from '../../../constants/tags';

interface FilterArtistProps {
	setArtistIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const AVAILABLE_CITIES = ['Melbourne', 'Sydney', 'Brisbane'];
const AVAILABLE_COUNTRIES = ['Australia', 'New Zealand'];

const FilterArtist: React.FC<FilterArtistProps> = ({ setArtistIds }) => {
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [hasUpcomingEvent, setHasUpcomingEvent] = useState(false);
	const [filtersActive, setFiltersActive] = useState(false);

	// Load filters from localStorage on mount
	useEffect(() => {
		setSelectedTypes(JSON.parse(localStorage.getItem(FILTER_ARTIST_TYPE_KEY) || '[]'));
		setSelectedTypes(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));
		setName(localStorage.getItem(FILTER_ARTIST_NAME_KEY) || '');
		setCity(localStorage.getItem(FILTER_ARTIST_CITY_KEY) || '');
		setCountry(localStorage.getItem(FILTER_ARTIST_COUNTRY_KEY) || '');
		setHasUpcomingEvent(localStorage.getItem(FILTER_ARTIST_UPCOMING_KEY) === 'true');
	}, []);

	// Save and fetch on filter change
	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const params = new URLSearchParams();
				if (name) params.append('name', name);
				selectedTypes.forEach(type => params.append('types', type));
				selectedTags.forEach(tag => params.append('tags', tag));
				if (city) params.append('city', city);
				if (country) params.append('country', country);
				if (hasUpcomingEvent) params.append('hasUpcomingEvent', 'true');

				const url = `${apiUrl}/artist${params.toString() ? `/?${params.toString()}` : ''}`;
				const response = await axios.get(url);
				setArtistIds(camelcaseKeys(response.data, { deep: true }));
			} catch (error) {
				console.error('Error fetching artists:', error);
			}
		};

		// Save filters
		localStorage.setItem(FILTER_ARTIST_TYPE_KEY, JSON.stringify(selectedTypes));
		localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(selectedTags));
		localStorage.setItem(FILTER_ARTIST_NAME_KEY, name);
		localStorage.setItem(FILTER_ARTIST_CITY_KEY, city);
		localStorage.setItem(FILTER_ARTIST_COUNTRY_KEY, country);
		localStorage.setItem(FILTER_ARTIST_UPCOMING_KEY, hasUpcomingEvent.toString());

		fetchArtists();
	}, [selectedTypes, selectedTags, name, city, country, hasUpcomingEvent]);

	// Check if filters are being applied
	useEffect(() => {
		setFiltersActive(
			selectedTypes.length > 0 ||
			selectedTags.length > 0 ||
			name !== '' ||
			city !== '' ||
			country !== '' ||
			hasUpcomingEvent
		);
	}, [selectedTypes, selectedTags, name, city, country, hasUpcomingEvent]);

	const resetFilters = () => {
		setSelectedTypes([]);
		setSelectedTags([]);
		setName('');
		setCity('');
		setCountry('');
		setHasUpcomingEvent(false);

		localStorage.removeItem(FILTER_ARTIST_TYPE_KEY);
		localStorage.removeItem(FILTER_ARTIST_NAME_KEY);
		localStorage.removeItem(FILTER_ARTIST_CITY_KEY);
		localStorage.removeItem(FILTER_ARTIST_COUNTRY_KEY);
		localStorage.removeItem(FILTER_ARTIST_UPCOMING_KEY);
	};

	const handleTypeChange = (type: string) => {
		setSelectedTypes(prev =>
			prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
		);
	};

	const handleTagChange = (tag: string) => {
		setSelectedTags(prev =>
			prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
		);
	};


	return (
		<div className={styles.wrapper}>
			<div className={styles.topRow}>

				{/* Title */}
				<input
					type="text"
					placeholder="Artist Title..."
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				{/* Has Upcoming Events */}
				<button
					type="button"
					className={`${styles.chip} ${hasUpcomingEvent ? styles.active : ''}`}
					onClick={() => setHasUpcomingEvent(prev => !prev)}
				>
					Performing Soon
				</button>


				{/* Country */}
				<select value={country} onChange={e => setCountry(e.target.value)}>
					<option value="">All Countries</option>
					{AVAILABLE_COUNTRIES.map(c => (
						<option key={c} value={c}>{c}</option>
					))}
				</select>

				{/* City */}
				<select
					value={city}
					onChange={e => setCity(e.target.value)}
					disabled={!country}
				>
					<option value="">All Cities</option>
					{AVAILABLE_CITIES.map(c => (
						<option key={c} value={c}>{c}</option>
					))}
				</select>

				{/* Reset */}
				<div
					className={`${styles.reset} ${(filtersActive) ? styles.filterActive : ''}`}
					onClick={resetFilters}
				>
					<img src="./circle-cross.svg" alt="reset filters" />
					<span>Reset Filters</span>
				</div>


			</div>

			{/* Tags */}
			<div className={styles.chipContainer}>
				{TAGS.map(tag => (
					<button
						key={tag}
						onClick={() => handleTagChange(tag)}
						className={`${styles.chip} ${selectedTags.includes(tag) ? styles.active : ''}`}
					>
						{tag}
					</button>
				))}
			</div>

			{/* Types */}
			<div className={styles.chipContainer}>
				{ARTIST_TYPES.map(type => (
					<button
						key={type}
						onClick={() => handleTypeChange(type)}
						className={`${styles.chip} ${selectedTypes.includes(type) ? styles.active : ''}`}
					>
						{type}
					</button>
				))}
			</div>

		</div >
	);
};

export default FilterArtist;
