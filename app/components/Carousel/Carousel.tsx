import React, { useRef, useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import { stringToHex } from '../../utils/stringToHex';

interface Props {
  imageUrls: string[];
  title: string;
}

const Carousel: React.FC<Props> = ({ imageUrls = [], title }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const newIndex = Math.round(
        container.scrollLeft / container.offsetWidth
      );
      setCurrentIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * containerRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const validImages = imageUrls
    .map((url, idx) => ({ url, idx }))
    .filter(({ idx }) => !failedIndexes.has(idx));

  return (
    <div className={styles.wrapper}>
      {validImages.length > 0 ? (
        <>
          <div className={styles.slider} ref={containerRef}>
            {validImages.map(({ url, idx }, index) => (
              <div key={idx} className={styles.container}>
                <div className={styles.imgWrapper}>
                  <img
                    src={url}
                    className={styles.imgBackground}
                    alt={title}
                    onError={() =>
                      setFailedIndexes(prev => new Set(prev).add(idx))
                    }
                  />
                  <img
                    src={url}
                    className={styles.imgFocus}
                    alt={title}
                    onError={() =>
                      setFailedIndexes(prev => new Set(prev).add(idx))
                    }
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
        </>
      ) : (
        <div className={styles.container}>
          <div
            className={styles.titleWrapper}
            style={{ backgroundColor: stringToHex(title) }}
          >
            <p>{title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
