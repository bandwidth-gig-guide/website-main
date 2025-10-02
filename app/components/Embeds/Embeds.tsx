import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader, SpotifyEmbed, YoutubeEmbed} from '@/components'
import styles from './Embeds.module.css';


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
      <SectionHeader title="Check Them Out" />
      <div ref={containerRef} className={styles.embedContainer}>
        {embeds.map((embed, index) => (
          <div
            key={index}
            ref={(el) => { embedRefs.current[index] = el; }}
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
