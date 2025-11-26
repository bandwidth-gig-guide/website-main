import React, { useEffect, useState, useRef } from 'react';
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import styles from './FilterEvent.module.css'
import { 
	TAGS, FILTER_TAGS_KEY, FILTER_EVENT_NAME_KEY, FILTER_EVENT_STATECODE_KEY, FILTER_CITIES_KEY, 
	FILTER_EVENT_MAX_PRICE_KEY, FILTER_EVENT_TYPE_KEY, FILTER_EVENT_DATE_KEY 
} from '@/constants';

interface FilterEventProps {
	setEventIds?: React.Dispatch<React.SetStateAction<uuid[]>>;
	setEventIdsByDate?: React.Dispatch<React.SetStateAction<Record<string, uuid[]>>>;
}

const FilterEvent: React.FC<FilterEventProps> = ({ setEventIds, setEventIdsByDate }) => {
	const [name, setName] = useState('');
	const [maxPrice, setMaxPrice] = useState<number>(9999);
	const [stateCode, setStateCode] = useState('');
	const [selectableCities, setSelectableCities] = useState<string[]>([]);
	const [selectedCities, setSelectedCities] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filtersActive, setFiltersActive] = useState(false);
	const [filtersLoaded, setFiltersLoaded] = useState(false);

  const datePickerRef = useRef<any>(null);
  
	const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	
	// Load filters from localStorage on mount
	useEffect(() => {
		setName(localStorage.getItem(FILTER_EVENT_NAME_KEY) || '');
		setStateCode(localStorage.getItem(FILTER_EVENT_STATECODE_KEY) || '');
		setSelectedCities(JSON.parse(localStorage.getItem(FILTER_CITIES_KEY) || '[]'));
		setMaxPrice(Number(localStorage.getItem(FILTER_EVENT_MAX_PRICE_KEY)) || 9999);
		setSelectedTypes(JSON.parse(localStorage.getItem(FILTER_EVENT_TYPE_KEY) || '[]'));
		setSelectedTags(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));

		const storedDates = JSON.parse(localStorage.getItem(FILTER_EVENT_DATE_KEY) || '[]');
  	setSelectedDates(storedDates.map((date: Date) => new DateObject(date)));

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
		const fetchEvents = async () => {
			if (!filtersLoaded) return;

			try {
				// Get params
				const params = new URLSearchParams();

				// Check params
				if (name) params.append('name', name);
				if (maxPrice) params.append('maxPrice', maxPrice.toString());
				if (stateCode) params.append('stateCode', stateCode);
				selectedCities.forEach(city => params.append('city', city));
				selectedTypes.forEach(type => params.append('types', type));
        selectedDates.forEach(date => params.append('dates', date.format('YYYY-MM-DD')));
				selectedTags.forEach(tag => params.append('tags', tag));

				if (setEventIds) {
					const url = `${api}/event/${params.toString() ? `?${params.toString()}` : ''}`;
					const response = await axios.get(url);
					setEventIds(camelcaseKeys(response.data, { deep: true }));
				}

				if (setEventIdsByDate) {
					const url = `${api}/event/by-date${params.toString() ? `?${params.toString()}` : ''}`;
					const response = await axios.get(url);
					setEventIdsByDate(camelcaseKeys(response.data, { deep: true }));
				}

			} catch (error) {
				console.error('Error fetching Events:', error);
			}
		};

		localStorage.setItem(FILTER_EVENT_NAME_KEY, name);
		localStorage.setItem(FILTER_EVENT_STATECODE_KEY, stateCode);
		localStorage.setItem(FILTER_CITIES_KEY, JSON.stringify(selectedCities));
		localStorage.setItem(FILTER_EVENT_MAX_PRICE_KEY, maxPrice.toString());
		localStorage.setItem(FILTER_EVENT_TYPE_KEY, JSON.stringify(selectedTypes));
		localStorage.setItem(FILTER_EVENT_DATE_KEY, JSON.stringify(selectedDates.map(date => date.format('YYYY-MM-DD'))));
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
		localStorage.removeItem(FILTER_CITIES_KEY);
		localStorage.removeItem(FILTER_EVENT_MAX_PRICE_KEY);
		localStorage.removeItem(FILTER_EVENT_TYPE_KEY);
		localStorage.removeItem(FILTER_EVENT_DATE_KEY);
		localStorage.removeItem(FILTER_TAGS_KEY);
	};

	// Handles selection / deselection of tag
	const handleTagChange = (tag: string) => {
		setSelectedTags(prev =>
			prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
		);
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
					placeholder="Event Title..."
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				{/* Price */}
				<div className={styles.priceContainer}>
					<div className={styles.priceToggle}>
						<button
							onClick={() => {
								if (maxPrice === 9999) {
									setMaxPrice(1);
								} else if (maxPrice === 1) {
									setMaxPrice(50);
								} else {
									setMaxPrice(9999);
								}
							}}
							className={`${styles.chip} ${maxPrice !== 9999 ? styles.active : ''}`}
						>
							{maxPrice === 9999 ? 'Any Price' : maxPrice === 1 ? 'Free Events' : `Under $${maxPrice}`}
						</button>
						{maxPrice !== 9999 && maxPrice !== 1 && (
							<div className={styles.priceSliderContainer}>
								<input
									type="range"
									min="10"
									max="200"
									step="5"
									value={maxPrice}
									onChange={(e) => setMaxPrice(Number(e.target.value))}
									className={styles.priceSlider}
								/>
							</div>
						)}
					</div>
				</div>

        {/* Dates */}
        <div className={styles.datePickerWrapper}>
          <div 
            className={`${styles.chip} ${selectedDates.length > 0 ? styles.active : ''}`} 
            onClick={() => datePickerRef.current?.openCalendar()}
          >
            Filter Dates
            <DatePicker
              ref={datePickerRef}
              className={styles.datePicker}
              value={selectedDates}
              onChange={setSelectedDates}
              minDate={new Date()}
              multiple
              sort
              highlightToday={false}
              format={'ddd, MMM DD'}
              calendarPosition="bottom-center"
              plugins={[<DatePanel />]}
              style={{ display: 'none' }}
              mapDays={({ date, selectedDate, currentMonth, isSameDate }) => {
                if (date.toDate() < new Date()) {
                  return {
                      disabled: true,
                      style: { color: '#ccc' }
                    };
                  }
                return {};
              }}
            />
          </div>
        </div>

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

export default FilterEvent;
