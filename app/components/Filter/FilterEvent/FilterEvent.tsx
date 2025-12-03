import React, { useEffect, useState, useRef } from 'react';
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Calendar, DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";

import {
  TAGS,
  FILTER_TAGS_KEY,
  FILTER_EVENT_NAME_KEY,
  FILTER_EVENT_STATECODE_KEY,
  FILTER_CITIES_KEY,
  FILTER_EVENT_MAX_PRICE_KEY,
  FILTER_EVENT_TYPE_KEY,
  FILTER_EVENT_DATE_KEY
} from '@/constants';

import styles from './FilterEvent.module.css';

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
  const [selectableDates, setSelectableDates] = useState<DateObject[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filtersActive, setFiltersActive] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<any>(null);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL;


  const getPriceLabel = (value: number) => {
    if (value <= 10) return "Free Events";
    if (value >= 200 || value === 9999) return "Any Price";
    return `Under $${value}`;
  };

  const togglePriceQuickSelect = () => {
    if (maxPrice === 9999) setMaxPrice(1);
    else if (maxPrice === 1) setMaxPrice(50);
    else setMaxPrice(9999);
  };

  const getSelectableDateProps = (date: DateObject) => {
    const formatted = date.format("YYYY-MM-DD");
    const isSelectable = selectableDates.some(
      d => d.format("YYYY-MM-DD") === formatted
    );

    if (!isSelectable) {
      return {
        disabled: true,
        style: { color: "#ccc", opacity: 0.4 },
        onClick: () => alert("This date is not selectable")
      };
    }
    return {};
  };

  const renderSelectedDateChips = () =>
    selectedDates.length > 0 && (
      <div className={styles.chipContainer}>
        {selectedDates.map((date, i) => (
          <button
            key={i}
            onClick={() => setSelectedDates(selectedDates.filter((_, ix) => ix !== i))}
            className={`${styles.chip} ${styles.active}`}
          >
            {date.format('ddd, MMM DD')}
          </button>
        ))}
      </div>
    );

  const renderTagChips = () =>
    TAGS.map(tag => (
      <button
        key={tag}
        onClick={() =>
          setSelectedTags(prev => prev.includes(tag)
            ? prev.filter(t => t !== tag)
            : [...prev, tag])
        }
        className={`${styles.chip} ${selectedTags.includes(tag) ? styles.active : ''}`}
      >
        {tag}
      </button>
    ));

  const renderCityChips = () =>
    selectableCities.map(city => (
      <button
        key={city}
        onClick={() =>
          setSelectedCities(prev => prev.includes(city)
            ? prev.filter(c => c !== city)
            : [...prev, city])
        }
        className={`${styles.chip} ${selectedCities.includes(city) ? styles.active : ''}`}
      >
        {city}
      </button>
    ));

  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

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


  useEffect(() => {
    const storedDates = JSON.parse(localStorage.getItem(FILTER_EVENT_DATE_KEY) || '[]');

    setName(localStorage.getItem(FILTER_EVENT_NAME_KEY) || '');
    setStateCode(localStorage.getItem(FILTER_EVENT_STATECODE_KEY) || '');
    setSelectedCities(JSON.parse(localStorage.getItem(FILTER_CITIES_KEY) || '[]'));
    setMaxPrice(Number(localStorage.getItem(FILTER_EVENT_MAX_PRICE_KEY)) || 9999);
    setSelectedTypes(JSON.parse(localStorage.getItem(FILTER_EVENT_TYPE_KEY) || '[]'));
    setSelectedDates(storedDates.map((d: Date) => new DateObject(d)));
    setSelectedTags(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));

    setFiltersLoaded(true);
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${api}/venue/cities`);
        setSelectableCities(response.data);
      } catch (err) {
        console.error("Error fetching cities", err);
      }
    };

    const fetchDates = async () => {
      try {
        const response = await axios.get(`${api}/event/by-date`);
        setSelectableDates(
          Object.keys(camelcaseKeys(response.data, { deep: true }))
            .map(date => new DateObject(date))
        );
      } catch (err) {
        console.error("Error fetching dates", err);
      }
    };

    fetchCities();
    fetchDates();
  }, []);

  useEffect(() => {
    if (!filtersLoaded) return;

    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (maxPrice) params.append('maxPrice', maxPrice.toString());
        if (stateCode) params.append('stateCode', stateCode);

        selectedCities.forEach(city => params.append('city', city));
        selectedTypes.forEach(type => params.append('types', type));
        selectedDates.forEach(date => params.append('dates', date.format('YYYY-MM-DD')));
        selectedTags.forEach(tag => params.append('tags', tag));

        if (setEventIds) {
          const response = await axios.get(`${api}/event/${params.toString() ? `?${params}` : ''}`);
          setEventIds(camelcaseKeys(response.data, { deep: true }));
        }

        if (setEventIdsByDate) {
          const response = await axios.get(`${api}/event/by-date${params.toString() ? `?${params}` : ''}`);
          setEventIdsByDate(camelcaseKeys(response.data, { deep: true }));
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    localStorage.setItem(FILTER_EVENT_NAME_KEY, name);
    localStorage.setItem(FILTER_EVENT_STATECODE_KEY, stateCode);
    localStorage.setItem(FILTER_CITIES_KEY, JSON.stringify(selectedCities));
    localStorage.setItem(FILTER_EVENT_MAX_PRICE_KEY, maxPrice.toString());
    localStorage.setItem(FILTER_EVENT_TYPE_KEY, JSON.stringify(selectedTypes));
    localStorage.setItem(FILTER_EVENT_DATE_KEY, JSON.stringify(selectedDates.map(d => d.format("YYYY-MM-DD"))));
    localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(selectedTags));

    fetchEvents();
  }, [name, stateCode, selectedCities, maxPrice, selectedTypes, selectedDates, selectedTags]);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className={styles.wrapper} ref={componentRef}>
      <div className={`${styles.internalWrapper} ${expanded ? styles.expanded : ''}`}>

        {/* Top Row */}
        <div className={styles.topRow}>
          <input
            type="text"
            placeholder="Event Title..."
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <div
            className={`${styles.reset} ${filtersActive ? styles.resetVisible : ''}`}
            onClick={resetFilters}
          >
            <span>Clear</span>
            <img src="./icons/circle-cross.svg" alt="reset" />
          </div>

          <button
            className={`${styles.chip} ${styles.filterToggle} ${expanded ? styles.active : ''}`}
            onClick={() => setExpanded(!expanded)}
          >
            Filter <span className={`${styles.arrow} ${expanded ? styles.expandedArrow : ''}`} />
          </button>
        </div>

        {/* Filters */}
        {expanded && (
          <div className={styles.filtersContainer}>

            {/* Price */}
            <details className={styles.section} open={openSection === 'price'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('price'); }}
              >
                <span>Price</span>
                {maxPrice < 200 && (
                  <span className={styles.count}>{getPriceLabel(maxPrice)}</span>
                )}
              </summary>

              <div>
                <div className={styles.priceToggle}>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className={styles.priceSlider}
                  />

                  <button
                    onClick={togglePriceQuickSelect}
                    className={`${styles.chip} ${styles.priceChip} ${maxPrice !== 9999 ? styles.active : ''}`}
                  >
                    {getPriceLabel(maxPrice)}
                  </button>
                </div>
              </div>
            </details>

            {/* Dates */}
            <details className={styles.section} open={openSection === 'dates'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('dates'); }}
              >
                <span>Dates</span>
                {selectedDates.length > 0 && (
                  <span className={styles.count}>({selectedDates.length})</span>
                )}
              </summary>

              <div className={styles.calenderWrapper}>
                <Calendar
                  className={`red ${styles.calendar}`}
                  ref={datePickerRef}
                  value={selectedDates}
                  onChange={setSelectedDates}
                  minDate={new Date()}
                  multiple
                  sort
                  highlightToday={false}
                  format={'ddd, MMM DD'}
                  mapDays={({ date }) => getSelectableDateProps(date)}
                />

                {renderSelectedDateChips()}
              </div>
            </details>

            {/* Tags */}
            <details className={styles.section} open={openSection === 'tags'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('tags'); }}
              >
                <span>Tags</span>
                {selectedTags.length > 0 && (
                  <span className={styles.count}>({selectedTags.length})</span>
                )}
              </summary>

              <div className={styles.chipContainer}>
                {renderTagChips()}
              </div>
            </details>

            {/* Cities */}
            <details className={styles.section} open={openSection === 'cities'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('cities'); }}
              >
                <span>Suburbs</span>
                {selectedCities.length > 0 && (
                  <span className={styles.count}>({selectedCities.length})</span>
                )}
              </summary>

              <div className={styles.chipContainer}>
                {renderCityChips()}
              </div>
            </details>

          </div>
        )}
      </div>
    </div>
  );
};

export default FilterEvent;
