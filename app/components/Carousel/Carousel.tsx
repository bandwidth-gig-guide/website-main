import React from 'react'
import styles from './Carousel.module.css'

interface Props {
  imageUrls: url[];
}

const Carousel: React.FC<Props> = ({ imageUrls = [] }) => {
  return (
    <div className={styles.wrapper}>
      {imageUrls.map((url, index) => (
        <div key={index} className={styles.imgWrapper}>
          <img src={url} className={styles.imgBackground}/>
          <img src={url} className={styles.imgFocus}/>
        </div>
      ))}
    </div>
  )
}

export default Carousel
