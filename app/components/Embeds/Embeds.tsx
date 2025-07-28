import React, { useEffect, useRef, useState } from 'react';
import styles from './Embeds.module.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import SpotifyEmbed from './Embed/SpotifyEmbed';
import YoutubeEmbed from './Embed/YoutubeEmbed';

interface Props {
  spotifyEmbedUrl?: string;
  youtubeEmbedUrl?: string;
}

const Embeds: React.FC<Props> = ({ spotifyEmbedUrl, youtubeEmbedUrl }) => {
  const embedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const embeds = [
    ...(spotifyEmbedUrl ? [<SpotifyEmbed key="spotify" embedUrl={spotifyEmbedUrl} />] : []),
    ...(youtubeEmbedUrl ? [<YoutubeEmbed key="youtube" embedUrl={youtubeEmbedUrl} />] : [])
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;

      const index = Math.round(scrollLeft / containerWidth);
      setActiveIndex(index);
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <SectionHeader title="Check Them Out" />
      <div ref={containerRef} className={styles.embedContainer}>
        {embeds.map((embed, index) => (
          <div
            key={index}
            ref={(el) => (embedRefs.current[index] = el)}
            className={styles.embedItem}
          >
            {embed}
          </div>
        ))}
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

export default Embeds;
