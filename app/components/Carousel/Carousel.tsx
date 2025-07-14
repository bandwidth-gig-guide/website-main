import React from 'react'
import styles from './Carousel.module.css'
import { stringToHex } from '../../util/stringToHex'


interface Props {
  imageUrls: url[];
  title: string;
}

const Carousel: React.FC<Props> = ({ imageUrls = [], title }) => {
  
  return (
    <div className={styles.wrapper}>

      {imageUrls.length > 0 && 
        imageUrls.map((url, index) => (
          <div key={index} className={styles.imgWrapper}>
            <img src={url} className={styles.imgBackground} alt={title}/>
            <img src={url} className={styles.imgFocus} alt={title}/>
          </div>
        )
      )}

      {imageUrls.length == 0 && 
        <div className={styles.titleWrapper} style={{ backgroundColor: stringToHex(title) }}>
          <p>{title}</p>
        </div>
      }

    </div>
  )
}

export default Carousel
