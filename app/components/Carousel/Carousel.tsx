import React, { useState, useRef } from 'react';
import styles from './Carousel.module.css';
import { stringToHex } from '../../util/stringToHex';

interface Props {
  imageUrls: string[];
  title: string;
}

const Carousel: React.FC<Props> = ({ imageUrls = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  // Swipe Detection
  let startX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const endX = e.clientX;
    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  };

  return (
    <div
      className={styles.wrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {imageUrls.length > 0 ? (
        <>
          <div
            className={styles.slider}
            style={{transform: `translateX(-${currentIndex * 100}%)`,}}
            ref={containerRef}
          >
            {imageUrls.map((url, index) => (
              <div key={index} className={styles.container}>
                <div className={styles.imgWrapper}>
                  <img src={url} className={styles.imgBackground} alt={title} />
                  <img src={url} className={styles.imgFocus} alt={title} />
                </div>
              </div>
            ))}
          </div>

            {/* If >1 image */}
            {imageUrls.length > 1 && (
              <>
                {/* Nav Buttons */}
                <button className={`${styles.control} ${styles.left}`} onClick={prev}>
                  ‹
                </button>
                <button className={`${styles.control} ${styles.right}`} onClick={next}>
                  ›
                </button>

                {/* Pagination Dots */}
                <div className={styles.dots}>
                  {imageUrls.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
        </>

      // If Not Images
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
