import React, { useRef, useState, useEffect, useMemo } from 'react';
import { stringToHex } from '@/utils';
import styles from './Carousel.module.css';

interface Props {
  imageUrls: string[];
  title: string;
}

const Carousel: React.FC<Props> = ({ imageUrls = [], title }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  const validImages = useMemo(
    () => imageUrls.filter(url => !failedUrls.has(url)),
    [imageUrls, failedUrls]
  );

  useEffect(() => {
    setCurrentIndex(0);
    setFailedUrls(new Set());

    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [imageUrls]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const width = container.offsetWidth;
      if (!width) return;

      const index = Math.round(container.scrollLeft / width);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [validImages.length]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({ left: index * container.offsetWidth, behavior: 'smooth' });
  };

  if (validImages.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.titleWrapper} style={{ backgroundColor: stringToHex(title) }}>
            <p>{title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider} ref={containerRef}>
        {validImages.map((url) => (
          <div key={url} className={styles.container}>
            <div className={styles.imgWrapper}>
              <img
                src={url}
                className={styles.imgBackground}
                alt={title}
              />
              <img
                src={url}
                className={styles.imgFocus}
                alt={title}
                onError={() => setFailedUrls(prev => new Set(prev).add(url))}
              />
            </div>
          </div>
        ))}
      </div>

      {validImages.length > 1 && (
        <div className={styles.dots}>
          {validImages.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
