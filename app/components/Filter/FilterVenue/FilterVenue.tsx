// React
import React, { useEffect, useState } from 'react';

// Styling
import styles from './FilterVenue.module.css'

// External libraries
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

// Config
import apiUrl from '../../../api.config';

// Constants
import {
	FILTER_VENUE_NAME_KEY,
	FILTER_VENUE_CITY_KEY,
} from '../../../constants/localstorage';

// TODO: Retrieve from db.
const AVAILABLE_CITIES = ['Melbourne', 'Collingwood', 'butt', 'Brisbane'];


interface FilterVenueProps {
	setVenueIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const FilterVenue: React.FC<FilterVenueProps> = ({ setVenueIds }) => {

	// State
	const [name, setName] = useState('');
	const [selectedCities, setSelectedCities] = useState<string[]>([]);
	const [hasUpcomingEvent, setHasUpcomingEvent] = useState<boolean>(false);
	const [filtersActive, setFiltersActive] = useState(false);
	const [filtersLoaded, setFiltersLoaded] = useState(false);


	// Load filters from localStorage on mount
	useEffect(() => {
		setName(localStorage.getItem(FILTER_VENUE_NAME_KEY) || '');
		setSelectedCities(JSON.parse(localStorage.getItem(FILTER_VENUE_CITY_KEY) || '[]'));

		setFiltersLoaded(true); 
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
				selectedCities.forEach(city => params.append('city', city));

				// Create Request
				const url = `${apiUrl}/venue${params.toString() ? `/?${params.toString()}` : ''}`;

				// Send Request
				const response = await axios.get(url);
				setVenueIds(camelcaseKeys(response.data, { deep: true }));

			} catch (error) {
				console.error('Error fetching Venues:', error);
			}
		};

		// Save filters so that they persist
		localStorage.setItem(FILTER_VENUE_NAME_KEY, name);
		localStorage.setItem(FILTER_VENUE_CITY_KEY, JSON.stringify(selectedCities));

		fetchVenues();

	}, [name, selectedCities]);

	// Check if filters are being applied
	useEffect(() => {
		setFiltersActive(
			name !== '' ||
			selectedCities.length > 0
		);
	}, [name, selectedCities]);

	// Clear all filters
	const resetFilters = () => {
		setName('');
		setSelectedCities([]);

		localStorage.removeItem(FILTER_VENUE_NAME_KEY);
		localStorage.removeItem(FILTER_VENUE_CITY_KEY);
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
					<img src="./circle-cross.svg" alt="reset filters" />
					<span>Reset Filters</span>
				</div>

			</div>

			{/* Cities */}
			<div className={styles.chipContainer}>
				{AVAILABLE_CITIES.map(city => (
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
