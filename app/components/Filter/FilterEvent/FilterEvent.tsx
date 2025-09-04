// React
import React, { useEffect, useState } from 'react';

// Styling
import styles from './FilterEvent.module.css'

// External libraries
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

// Config
import apiUrl from '../../../api.config';

// Constants
import { EVENT_TYPES } from '../../../constants/eventTypes';
import { TAGS } from '../../../constants/tags';
import {
	FILTER_TAGS_KEY,
	FILTER_EVENT_NAME_KEY,
	FILTER_EVENT_STATECODE_KEY,
	FILTER_EVENT_CITY_KEY,
	FILTER_EVENT_MAX_PRICE_KEY,
	FILTER_EVENT_TYPE_KEY,
	FILTER_EVENT_DATE_KEY
} from '../../../constants/localstorage';

// TODO: Retrieve from db.
const AVAILABLE_CITIES = ['Melbourne', 'Collingwood', 'Brisbane'];
const AVAILABLE_STATES= ['VIC', 'NSW'];


interface FilterEventProps {
	setEventIds?: React.Dispatch<React.SetStateAction<uuid[]>>;
	setEventIdsByDate?: React.Dispatch<React.SetStateAction<Record<string, uuid[]>>>;
}

const FilterEvent: React.FC<FilterEventProps> = ({ setEventIds, setEventIdsByDate }) => {

	// State
	const [name, setName] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [selectedCities, setSelectedCities] = useState<string[]>([]);
	const [maxPrice, setMaxPrice] = useState<number>(999);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filtersActive, setFiltersActive] = useState(false);
	const [filtersLoaded, setFiltersLoaded] = useState(false);


	// Load filters from localStorage on mount
	useEffect(() => {
		setName(localStorage.getItem(FILTER_EVENT_NAME_KEY) || '');
		setStateCode(localStorage.getItem(FILTER_EVENT_STATECODE_KEY) || '');
		setSelectedCities(JSON.parse(localStorage.getItem(FILTER_EVENT_CITY_KEY) || '[]'));
		setMaxPrice(Number(localStorage.getItem(FILTER_EVENT_MAX_PRICE_KEY)) || 9999);
		setSelectedTypes(JSON.parse(localStorage.getItem(FILTER_EVENT_TYPE_KEY) || '[]'));
		setSelectedDates(JSON.parse(localStorage.getItem(FILTER_EVENT_DATE_KEY) || '[]'));
		setSelectedTags(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));

		setFiltersLoaded(true); 
	}, []);

	// Save and fetch on filter change
	useEffect(() => {

		// Async function to retrieve IDs
		const fetchEvents = async () => {
			if (!filtersLoaded) return;

			try {
				// Get params
				const params = new URLSearchParams();

				// Check params
				if (name) params.append('name', name);
				if (stateCode) params.append('stateCode', stateCode);
				selectedCities.forEach(city => params.append('city', city));
				if (maxPrice) params.append('maxPrice', maxPrice.toString());
				selectedTypes.forEach(type => params.append('types', type));
				selectedDates.forEach(date => params.append('dates', date.toString()));
				selectedTags.forEach(tag => params.append('tags', tag));

				if (setEventIds) {
					const url = `${apiUrl}/event${params.toString() ? `/?${params.toString()}` : ''}`;
					const response = await axios.get(url);
					setEventIds(camelcaseKeys(response.data, { deep: true }));
				}

				if (setEventIdsByDate) {
					const url = `${apiUrl}/event/by-date${params.toString() ? `/?${params.toString()}` : ''}`;
					const response = await axios.get(url);
					setEventIdsByDate(camelcaseKeys(response.data, { deep: true }));
				}

			} catch (error) {
				console.error('Error fetching Events:', error);
			}
		};

		// Save filters so that they persist
		localStorage.setItem(FILTER_EVENT_NAME_KEY, name);
		localStorage.setItem(FILTER_EVENT_STATECODE_KEY, stateCode);
		localStorage.setItem(FILTER_EVENT_CITY_KEY, JSON.stringify(selectedCities));
		localStorage.setItem(FILTER_EVENT_MAX_PRICE_KEY, maxPrice.toString());
		localStorage.setItem(FILTER_EVENT_TYPE_KEY, JSON.stringify(selectedTypes));
		localStorage.setItem(FILTER_EVENT_DATE_KEY, JSON.stringify(selectedDates));
		localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(selectedTags));

		fetchEvents();

	}, [name, stateCode, selectedCities, maxPrice, selectedTypes, selectedDates, selectedTags]);

	// Check if filters are being applied
	useEffect(() => {
		setFiltersActive(
			name !== '' ||
			stateCode !== '' ||
			selectedCities.length > 0 ||
			maxPrice !== 9999 ||
			selectedTypes.length > 0 ||
			selectedDates.length > 0 ||
			selectedTags.length > 0
		);
	}, [name, stateCode, selectedCities, maxPrice, selectedTypes, selectedDates, selectedTags]);

	// Clear all filters
	const resetFilters = () => {
		setName('');
		setStateCode('');
		setSelectedCities([]);
		setMaxPrice(9999);
		setSelectedTypes([]);
		setSelectedDates([]);
		setSelectedTags([]);

		localStorage.removeItem(FILTER_EVENT_NAME_KEY);
		localStorage.removeItem(FILTER_EVENT_STATECODE_KEY);
		localStorage.removeItem(FILTER_EVENT_CITY_KEY);
		localStorage.removeItem(FILTER_EVENT_MAX_PRICE_KEY);
		localStorage.removeItem(FILTER_EVENT_TYPE_KEY);
		localStorage.removeItem(FILTER_EVENT_DATE_KEY);
		localStorage.removeItem(FILTER_TAGS_KEY);
	};

	// Handles selection / deselection of type
	const handleTypeChange = (type: string) => {
		setSelectedTypes(prev =>
			prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
		);
	};
	
	// Handles selection / deselection of tag
	const handleCityChange = (city: string) => {
		setSelectedCities(prev =>
			prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
		);
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
					placeholder="Event Title..."
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				{/* State Code */}
				<select value={stateCode} onChange={e => setStateCode(e.target.value)}>
					<option value="">Australia Wide</option>
					{AVAILABLE_STATES.map(c => (
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

			{/* Types */}
			<div className={styles.chipContainer}>
				{EVENT_TYPES.map(type => (
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

export default FilterEvent;
