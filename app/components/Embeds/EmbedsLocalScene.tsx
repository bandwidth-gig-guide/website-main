import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader, SpotifyEmbed } from '@/components'
import Link from 'next/link'
import styles from './Embeds.module.css';


const embedData = [
  {
    spotifyPlaylistEmbedUrl: 'https://open.spotify.com/embed/playlist/4HyHkwCfKg9ncqu6bYtbwv?utm_source=generator',
    creatorName: 'Matthew Cross',
    creatorTagline: 'Bass, The Amazing Devil',
    creatorArtistUuid: 'b7e8e7e2-7c6a-4e2e-9c2a-1a2b3c4d5e6f'
  },
  {
    spotifyPlaylistEmbedUrl: 'https://open.spotify.com/embed/playlist/0IatferdsPVBKJwEACK6kE?utm_source=generator',
    creatorName: 'Gavin Waldron',
    creatorTagline: 'The Gasometer Hotel',
    creatorVenueUuid: 'e3b0c442-98fc-1c14-9afb-4c1f1b6e8b8a'
  },
];

const EmbedsLocalScene: React.FC = () => {
  const embedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const embeds = embedData.map((data, idx) => (
    <SpotifyEmbed key={idx} embedUrl={data.spotifyPlaylistEmbedUrl} />
  ));

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = embedRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    embedRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [embeds.length]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (container && embedRefs.current[index]) {
      const offsetLeft = embedRefs.current[index]?.offsetLeft || 0;
      container.scrollTo({
        left: offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  if (embeds.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Local Sounds" />
      <div ref={containerRef} className={styles.embedContainer}>
        {embeds.map((embed, index) => {
          const creator = embedData[index];
          const href = creator.creatorArtistUuid
            ? `/artist/${creator.creatorArtistUuid}`
            : creator.creatorVenueUuid
              ? `/venue/${creator.creatorVenueUuid}`
              : undefined;

          const content = (
            <div className={styles.creator}>
              <p><strong>Playlist by {creator.creatorName}</strong></p>
              <p><em>{creator.creatorTagline}</em></p>
            </div>
          );

          return (
            <div
              key={index}
              ref={(el) => { embedRefs.current[index] = el; }}
              className={styles.embedItem}
            >
              {embed}
              {href ? <Link href={href}>{content}</Link> : content}
            </div>
          );
        })}
      </div>
      <div className={styles.paginationDots}>
        {embeds.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmbedsLocalScene;
