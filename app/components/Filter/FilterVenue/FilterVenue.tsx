import React, { useEffect, useState, useRef } from 'react';
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import styles from '../Filter.module.css';
import {
  FILTER_VENUE_NAME_KEY,
  FILTER_CITIES_KEY,
  FILTER_VENUE_UPCOMING_KEY,
  FILTER_VENUE_IS_MONITORED
} from '@/constants';

interface FilterVenueProps {
  setVenueIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const FilterVenue: React.FC<FilterVenueProps> = ({ setVenueIds }) => {
  const [name, setName] = useState('');
  const [selectableCities, setSelectableCities] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [hasUpcomingEvent, setHasUpcomingEvent] = useState(false);
  const [isMonitored, setIsMonitored] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);
  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL;

  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

  const resetFilters = () => {
    setName('');
    setSelectedCities([]);
    setHasUpcomingEvent(false);
    setIsMonitored(false);

    localStorage.removeItem(FILTER_VENUE_NAME_KEY);
    localStorage.removeItem(FILTER_CITIES_KEY);
    localStorage.removeItem(FILTER_VENUE_UPCOMING_KEY);
    localStorage.removeItem(FILTER_VENUE_IS_MONITORED);
  };

  const handleCityChange = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  // Load saved filters on mount
  useEffect(() => {
    setName(localStorage.getItem(FILTER_VENUE_NAME_KEY) || '');
    setSelectedCities(JSON.parse(localStorage.getItem(FILTER_CITIES_KEY) || '[]'));
    setHasUpcomingEvent(localStorage.getItem(FILTER_VENUE_UPCOMING_KEY) === 'true');
    setIsMonitored(localStorage.getItem(FILTER_VENUE_IS_MONITORED) === 'true');

    setFiltersLoaded(true);
  }, []);

  // Fetch selectable cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${api}/venue/cities`);
        setSelectableCities(response.data);
      } catch (err) {
        console.error("Error fetching cities", err);
      }
    };
    fetchCities();
  }, []);

  // Save filters and fetch venues on change
  useEffect(() => {
    if (!filtersLoaded) return;

    const fetchVenues = async () => {
      try {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (hasUpcomingEvent) params.append('hasUpcomingEvent', 'true');
        if (isMonitored) params.append('isMonitored', 'true');
        selectedCities.forEach(city => params.append('city', city));

        const url = `${api}/venue/${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await axios.get(url);
        setVenueIds(camelcaseKeys(response.data, { deep: true }));
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };

    localStorage.setItem(FILTER_VENUE_NAME_KEY, name);
    localStorage.setItem(FILTER_CITIES_KEY, JSON.stringify(selectedCities));
    localStorage.setItem(FILTER_VENUE_UPCOMING_KEY, hasUpcomingEvent.toString());
    localStorage.setItem(FILTER_VENUE_IS_MONITORED, isMonitored.toString());

    fetchVenues();
  }, [name, selectedCities, hasUpcomingEvent, isMonitored]);

  // Update filtersActive state
  useEffect(() => {
    setFiltersActive(
      name !== '' ||
      selectedCities.length > 0 ||
      hasUpcomingEvent ||
      isMonitored
    );
  }, [name, selectedCities, hasUpcomingEvent, isMonitored]);

  // Collapse filters when clicking outside
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
            placeholder="Venue Title..."
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

						{/* Flags */}
            <details className={styles.section} open={openSection === 'flags'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('flags'); }}
              >
                <span>Flags</span>
                {(isMonitored || hasUpcomingEvent) && (
									<span className={styles.count}>
										({(isMonitored ? 1 : 0) + (hasUpcomingEvent ? 1 : 0)})
									</span>
                )}
              </summary>

              <div className={styles.chipContainer}>
                <button
                  className={`${styles.chip} ${isMonitored ? styles.active : ''}`}
                  onClick={() => setIsMonitored(prev => !prev)}
                >
                  Monitored by Bandwidth
                </button>

                <button
                  className={`${styles.chip} ${hasUpcomingEvent ? styles.active : ''}`}
                  onClick={() => setHasUpcomingEvent(prev => !prev)}
                >
                  Upcoming Events
                </button>
              </div>
            </details>

            {/* Cities */}
            <details className={styles.section} open={openSection === 'cities'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('cities'); }}
              >
                <span>Suburbs</span>
                {selectedCities.length > 0 && <span className={styles.count}>({selectedCities.length})</span>}
              </summary>
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
            </details>

          </div>
        )}
      </div>
    </div>
  );
};

export default FilterVenue;
