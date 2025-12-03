import React, { useEffect, useState, useRef } from 'react';
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import styles from '../Filter.module.css';
import {
  TAGS,
  FILTER_TAGS_KEY,
  FILTER_ARTIST_NAME_KEY,
  FILTER_ARTIST_CITY_KEY,
  FILTER_ARTIST_UPCOMING_KEY
} from '@/constants';

interface FilterArtistProps {
  setArtistIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const FilterArtist: React.FC<FilterArtistProps> = ({ setArtistIds }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [hasUpcomingEvent, setHasUpcomingEvent] = useState(false);
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
    setCity('');
    setHasUpcomingEvent(false);
    setSelectedTags([]);

    localStorage.removeItem(FILTER_ARTIST_NAME_KEY);
    localStorage.removeItem(FILTER_ARTIST_CITY_KEY);
    localStorage.removeItem(FILTER_ARTIST_UPCOMING_KEY);
    localStorage.removeItem(FILTER_TAGS_KEY);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };


	useEffect(() => {
    setName(localStorage.getItem(FILTER_ARTIST_NAME_KEY) || '');
    setCity(localStorage.getItem(FILTER_ARTIST_CITY_KEY) || '');
    setHasUpcomingEvent(localStorage.getItem(FILTER_ARTIST_UPCOMING_KEY) === 'true');
    setSelectedTags(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));
    setFiltersLoaded(true);
  }, []);


	useEffect(() => {
    if (!filtersLoaded) return;

    const fetchArtists = async () => {
      try {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (city) params.append('city', city);
        if (hasUpcomingEvent) params.append('hasUpcomingEvent', 'true');
        selectedTags.forEach(tag => params.append('tags', tag));

        const url = `${api}/artist/${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await axios.get(url);
        setArtistIds(camelcaseKeys(response.data, { deep: true }));
      } catch (err) {
        console.error("Error fetching artists:", err);
      }
    };

    localStorage.setItem(FILTER_ARTIST_NAME_KEY, name);
    localStorage.setItem(FILTER_ARTIST_CITY_KEY, city);
    localStorage.setItem(FILTER_ARTIST_UPCOMING_KEY, hasUpcomingEvent.toString());
    localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(selectedTags));

    fetchArtists();
  }, [name, city, hasUpcomingEvent, selectedTags]);


	useEffect(() => {
    setFiltersActive(
      name !== '' || city !== '' || hasUpcomingEvent || selectedTags.length > 0
    );
  }, [name, city, hasUpcomingEvent, selectedTags]);


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
            placeholder="Artist Name..."
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
                {hasUpcomingEvent && <span className={styles.count}>(1)</span>}
              </summary>

              <div className={styles.chipContainer}>
                <button
                  className={`${styles.chip} ${hasUpcomingEvent ? styles.active : ''}`}
                  onClick={() => setHasUpcomingEvent(prev => !prev)}
                >
                  Performing Soon
                </button>
              </div>
            </details>

            {/* City */}
            {/* <details className={styles.section} open={openSection === 'city'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('city'); }}
              >
                <span>City</span>
                {city && <span className={styles.count}>(1)</span>}
              </summary>

              <div className={styles.chipContainer}>
                <input
                  type="text"
                  placeholder="City..."
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className={styles.inputField}
                />
              </div>
            </details> */}

            {/* Tags */}
            <details className={styles.section} open={openSection === 'tags'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('tags'); }}
              >
                <span>Tags</span>
                {selectedTags.length > 0 && <span className={styles.count}>({selectedTags.length})</span>}
              </summary>

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
            </details>

          </div>
        )}
      </div>
    </div>
  );
};

export default FilterArtist;
