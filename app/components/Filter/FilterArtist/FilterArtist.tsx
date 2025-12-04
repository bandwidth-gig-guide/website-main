import React, { useEffect, useState, useRef } from 'react';
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import styles from '../Filter.module.css';
import { StateCode } from '@/enums';
import {
  TAGS,
  FILTER_TAGS_KEY,
  FILTER_ARTIST_NAME_KEY,
  FILTER_ARTIST_STATECODE_KEY,
  FILTER_ARTIST_UPCOMING_KEY
} from '@/constants';

interface FilterArtistProps {
  setArtistIds: React.Dispatch<React.SetStateAction<uuid[]>>;
}

const FilterArtist: React.FC<FilterArtistProps> = ({ setArtistIds }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [selectedStateCodes, setSelectedStateCodes] = useState<string[]>([]);
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
    setSelectedStateCodes([]);
    setHasUpcomingEvent(false);
    setSelectedTags([]);

    localStorage.removeItem(FILTER_ARTIST_NAME_KEY);
    localStorage.removeItem(FILTER_ARTIST_STATECODE_KEY);
    localStorage.removeItem(FILTER_ARTIST_UPCOMING_KEY);
    localStorage.removeItem(FILTER_TAGS_KEY);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleStateCodeChange = (stateCode: StateCode) => {
    setSelectedStateCodes(prev =>
      prev.includes(stateCode) ? prev.filter(t => t !== stateCode) : [...prev, stateCode]
    );
  };


  useEffect(() => {
    setName(localStorage.getItem(FILTER_ARTIST_NAME_KEY) || '');
    setHasUpcomingEvent(localStorage.getItem(FILTER_ARTIST_UPCOMING_KEY) === 'true');
    setSelectedTags(JSON.parse(localStorage.getItem(FILTER_TAGS_KEY) || '[]'));
    setSelectedStateCodes(JSON.parse(localStorage.getItem(FILTER_ARTIST_STATECODE_KEY) || '[]'));
    setFiltersLoaded(true);
  }, []);


  useEffect(() => {
    if (!filtersLoaded) return;

    const fetchArtists = async () => {
      try {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (hasUpcomingEvent) params.append('hasUpcomingEvent', 'true');
        selectedTags.forEach(tag => params.append('tags', tag));
        selectedStateCodes.forEach(stateCode => params.append('stateCodes', stateCode));

        const url = `${api}/artist/${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await axios.get(url);
        setArtistIds(camelcaseKeys(response.data, { deep: true }));
      } catch (err) {
        console.error("Error fetching artists:", err);
      }
    };

    localStorage.setItem(FILTER_ARTIST_NAME_KEY, name);
    localStorage.setItem(FILTER_ARTIST_UPCOMING_KEY, hasUpcomingEvent.toString());
    localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(selectedTags));
    localStorage.setItem(FILTER_ARTIST_STATECODE_KEY, JSON.stringify(selectedStateCodes));

    fetchArtists();
  }, [name, selectedStateCodes, hasUpcomingEvent, selectedTags]);


  useEffect(() => {
    setFiltersActive(
      name !== '' || selectedStateCodes.length > 0 || hasUpcomingEvent || selectedTags.length > 0
    );
  }, [name, selectedStateCodes, hasUpcomingEvent, selectedTags]);


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

            {/* Hometown */}
            <details className={styles.section} open={openSection === 'hometown'}>
              <summary
                className={styles.sectionTitle}
                onClick={(e) => { e.preventDefault(); toggleSection('hometown'); }}
              >
                <span>Hometown</span>
                {selectedTags.length > 0 && <span className={styles.count}>({selectedTags.length})</span>}
              </summary>
              <div className={styles.chipContainer}>
                <button
                  onClick={() => {
                    const allStateCodes = Object.values(StateCode).slice(0, -1);
                    const allSelected = allStateCodes.every(code => selectedStateCodes.includes(code));
                    setSelectedStateCodes(allSelected ? [] : allStateCodes);
                  }}
                  className={`${styles.chip} ${Object.values(StateCode).slice(0, -1).every(code => selectedStateCodes.includes(code)) ? styles.active : ''}`}
                >
                  AUSTRALIA
                </button>
                {Object.values(StateCode).slice(0, -1).map(stateCode => (
                  <button
                    key={stateCode}
                    onClick={() => handleStateCodeChange(stateCode)}
                    className={`${styles.chip} ${selectedStateCodes.includes(stateCode) ? styles.active : ''}`}
                  >
                    {stateCode}
                  </button>
                ))}
              </div>
            </details>

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
