// React
import React, { useEffect, useState } from 'react';

// Styling
import styles from './FilterArtist.module.css'

// External libraries
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

// Config
import getConfig from "next/config";

// Constants
import { 
	TAGS, FILTER_TAGS_KEY, FILTER_ARTIST_NAME_KEY, FILTER_ARTIST_CITY_KEY, 
	FILTER_ARTIST_UPCOMING_KEY 
} from '@/constants';

interface FilterArtistProps {
	setArtistIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const FilterArtist: React.FC<FilterArtistProps> = ({ setArtistIds }) => {

	// State
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [hasUpcomingEvent, setHasUpcomingEvent] = useState(false);
	const [filtersActive, setFiltersActive] = useState(false);
	const [filtersLoaded, setFiltersLoaded] = useState(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	// Load filters from localStorage on mount
	useEffect(() => {
		setName(localStorage.getItem(FILTER_ARTIST_NAME_KEY) || '');
		setHasUpcomingEvent(localStorage.getItem(FILTER_ARTIST_UPCOMING_KEY) === 'true');
		setCity(localStorage.getItem(FILTER_ARTIST_CITY_KEY) || '');
		setSelectedTags(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));

		setFiltersLoaded(true); 
	}, []);

	// Save and fetch on filter change
	useEffect(() => {

		// Async function to retrieve IDs
		const fetchArtists = async () => {
			if (!filtersLoaded) return;

			try {
				// Get params
				const params = new URLSearchParams();

				// Check params
				if (name) params.append('name', name);
				if (hasUpcomingEvent) params.append('hasUpcomingEvent', 'true');
				if (city) params.append('city', city);
				selectedTags.forEach(tag => params.append('tags', tag));

				// Create Request
				const url = `${api}/artist/${params.toString() ? `?${params.toString()}` : ''}`;

				// Send Request
				const response = await axios.get(url);
				setArtistIds(camelcaseKeys(response.data, { deep: true }));

			} catch (error) {
				console.error('Error fetching artists:', error);
			}
		};

		// Save filters so that they persist
		localStorage.setItem(FILTER_ARTIST_NAME_KEY, name);
		localStorage.setItem(FILTER_ARTIST_UPCOMING_KEY, hasUpcomingEvent.toString());
		localStorage.setItem(FILTER_ARTIST_CITY_KEY, city);
		localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(selectedTags));

		fetchArtists();

	}, [name, hasUpcomingEvent, city, selectedTags]);

	// Check if filters are being applied
	useEffect(() => {
		setFiltersActive(
			selectedTags.length > 0 ||
			name !== '' ||
			city !== '' ||
			hasUpcomingEvent
		);
	}, [name, hasUpcomingEvent, city, selectedTags]);

	// Clear all filters
	const resetFilters = () => {
		setName('');
		setHasUpcomingEvent(false);
		setCity('');
		setSelectedTags([]);

		localStorage.removeItem(FILTER_ARTIST_NAME_KEY);
		localStorage.removeItem(FILTER_ARTIST_UPCOMING_KEY);
		localStorage.removeItem(FILTER_ARTIST_CITY_KEY);
		localStorage.removeItem(FILTER_TAGS_KEY);
	};

	// Handles selection / deselection of tag
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

				{/* Reset */}
				<div
					className={`${styles.reset} ${(filtersActive) ? styles.filterActive : ''}`}
					onClick={resetFilters}
				>
					<img src="./icons/circle-cross.svg" alt="reset filters" />
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

		</div >
	);
};

export default FilterArtist;
