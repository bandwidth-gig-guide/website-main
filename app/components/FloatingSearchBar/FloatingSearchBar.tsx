import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import getConfig from "next/config";
import styles from "./FloatingSearchBar.module.css";

interface SearchResultItem {
  id: string;
  title: string;
}

interface SearchResult {
  event: SearchResultItem[];
  artist: SearchResultItem[];
  venue: SearchResultItem[];
}

const FloatingSearchBar = () => {
  const router = useRouter();
  const api = getConfig().publicRuntimeConfig.SERVICE_SEARCH_API_URL;

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchString, setSearchString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>({
    event: [],
    artist: [],
    venue: [],
  });

  const hasResults =
    searchResult.event.length > 0 ||
    searchResult.artist.length > 0 ||
    searchResult.venue.length > 0;

  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearchString("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleSelect = async (type: string, id: string) => {
    await router.push(`/${type}/${id}`);
    closeSearch();
  };

  useEffect(() => {
    if (!searchString) {
      setSearchResult({ event: [], artist: [], venue: [] });
      return;
    }

    axios
      .get(`${api}/all/id-and-title`, { params: { searchString } })
      .then((res) =>
        setSearchResult(camelcaseKeys(res.data, { deep: true }))
      );
  }, [searchString]);

  return (
    <div className={styles.wrapper}>

      <div className={styles.floatingSearchTrigger} onClick={openSearch}>
        <img src="/icons/search.svg" alt="Search" />
      </div>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.header}>
            <img
              src="/icons/circle-cross.svg"
              alt="Back"
              className={styles.floatingSearchTrigger}
              onClick={closeSearch}
            />

            <input
              ref={inputRef}
              type="text"
              placeholder="Search events, artists, venues..."
              value={searchString}
              onChange={handleInputChange}
            />

            {searchString && (
              <img
                src="/icons/circle-cross.svg"
                alt="Clear"
                className={styles.clearIcon}
                onClick={() => setSearchString("")}
              />
            )}
          </div>

          {/* Results */}
          <div className={styles.results}>
            {hasResults ? (
              <>
                {searchResult.event.length > 0 && (
                  <div>
                    <h2>Event</h2>
                    {searchResult.event.map((item) => (
                      <p
                        key={item.id}
                        onClick={() => handleSelect("event", item.id)}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}

                {searchResult.artist.length > 0 && (
                  <div>
                    <h2>Artist</h2>
                    {searchResult.artist.map((item) => (
                      <p
                        key={item.id}
                        onClick={() => handleSelect("artist", item.id)}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}

                {searchResult.venue.length > 0 && (
                  <div>
                    <h2>Venue</h2>
                    {searchResult.venue.map((item) => (
                      <p
                        key={item.id}
                        onClick={() => handleSelect("venue", item.id)}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}
              </>
            ) : searchString && (
              <p className={styles.noResults}>No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSearchBar;
