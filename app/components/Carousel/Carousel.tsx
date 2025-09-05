import React, { useRef, useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import { stringToHex } from '../../util/stringToHex';

interface Props {
  imageUrls: string[];
  title: string;
}

const Carousel: React.FC<Props> = ({ imageUrls = [], title }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track scroll position to update currentIndex
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

  return (
    <div className={styles.wrapper}>
      {imageUrls.length > 0 ? (
        <>
          <div className={styles.slider} ref={containerRef}>
            {imageUrls.map((url, index) => (
              <div key={index} className={styles.container}>
                <div className={styles.imgWrapper}>
                  <img src={url} className={styles.imgBackground} alt={title} />
                  <img src={url} className={styles.imgFocus} alt={title} />
                </div>
              </div>
            ))}
          </div>

          {imageUrls.length > 1 && (
            <div className={styles.dots}>
              {imageUrls.map((_, index) => (
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
