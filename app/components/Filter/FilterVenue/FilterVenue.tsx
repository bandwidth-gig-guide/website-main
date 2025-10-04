import React, { useEffect, useState } from 'react';
import { FILTER_VENUE_NAME_KEY, FILTER_CITIES_KEY, FILTER_VENUE_UPCOMING_KEY } from '@/constants';
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import styles from './FilterVenue.module.css'

interface FilterVenueProps {
	setVenueIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const FilterVenue: React.FC<FilterVenueProps> = ({ setVenueIds }) => {

	// State
	const [name, setName] = useState('');
	const [selectableCities, setSelectableCities] = useState<string[]>([]);
	const [selectedCities, setSelectedCities] = useState<string[]>([]);
	const [hasUpcomingEvent, setHasUpcomingEvent] = useState<boolean>(false);
	const [filtersActive, setFiltersActive] = useState(false);
	const [filtersLoaded, setFiltersLoaded] = useState(false);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	// Load filters from localStorage on mount
	useEffect(() => {
		setName(localStorage.getItem(FILTER_VENUE_NAME_KEY) || '');
		setSelectedCities(JSON.parse(localStorage.getItem(FILTER_CITIES_KEY) || '[]'));
		setHasUpcomingEvent(localStorage.getItem(FILTER_VENUE_UPCOMING_KEY) === 'true');

		setFiltersLoaded(true); 
	}, []);

	// Load selectable cities on mount
	useEffect(() => {
		const fetchCities = async () => {
			try {
				const url = `${api}/venue/cities`;
				const response = await axios.get(url);
				setSelectableCities(response.data);
			} catch (error) {
				console.error('Error fetching cities:', error);
			}
		};

		fetchCities();
	}, []);

	// Save and fetch on filter change
	useEffect(() => {

		// Async function to retrieve IDs
		const fetchVenues = async () => {
			if (!filtersLoaded) return;

			try {
				// Get params
				const params = new URLSearchParams();

				// Check params
				if (name) params.append('name', name);
				if (hasUpcomingEvent) params.append('hasUpcomingEvent', 'true');
				selectedCities.forEach(city => params.append('city', city));

				// Create Request
				const url = `${api}/venue/${params.toString() ? `?${params.toString()}` : ''}`;

				// Send Request
				const response = await axios.get(url);
				setVenueIds(camelcaseKeys(response.data, { deep: true }));

			} catch (error) {
				console.error('Error fetching Venues:', error);
			}
		};

		// Save filters so that they persist
		localStorage.setItem(FILTER_VENUE_NAME_KEY, name);
		localStorage.setItem(FILTER_CITIES_KEY, JSON.stringify(selectedCities));
		localStorage.setItem(FILTER_VENUE_UPCOMING_KEY, hasUpcomingEvent.toString());

		fetchVenues();

	}, [name, selectedCities, hasUpcomingEvent]);

	// Check if filters are being applied
	useEffect(() => {
		setFiltersActive(
			name !== '' ||
			selectedCities.length > 0 ||
			hasUpcomingEvent
		);
	}, [name, selectedCities, hasUpcomingEvent]);

	// Clear all filters
	const resetFilters = () => {
		setName('');
		setSelectedCities([]);
		setHasUpcomingEvent(false);

		localStorage.removeItem(FILTER_VENUE_NAME_KEY);
		localStorage.removeItem(FILTER_CITIES_KEY);
		localStorage.removeItem(FILTER_VENUE_UPCOMING_KEY);
	};

	// Handles selection / deselection of tag
	const handleCityChange = (city: string) => {
		setSelectedCities(prev =>
			prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
		);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topRow}>

				{/* Title */}
				<input
					type="text"
					placeholder="Venue Title..."
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				{/* Monitored by Bandwidth */}
				<button
					type="button"
					className={`${styles.chip} ${hasUpcomingEvent ? styles.active : ''}`}
					onClick={() => setHasUpcomingEvent(prev => !prev)}
				>
					Monitored by Bandwidth
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

			{/* Cities */}
			<div className={styles.chipContainer}>
				{selectableCities.map(city => (
					<button
						key={city}
						onClick={() => handleCityChange(city)}
						className={`${styles.chip} ${selectedCities.includes(city) ? styles.active : ''}`}
					>
						{city}
					</button>
				))}
			</div>

		</div >
	);
};

export default FilterVenue;
