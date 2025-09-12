import React from 'react';
import styles from "./Hero.module.css";

const artwork = {
  artwork_21_7: "./heros/hero-0001.svg",
  artwork_24_36: "", 
  artistName: "Matthew Cross",
  artistCompany: "Freelance Graphic Designer",
  artistCompanyUrl: "https://google.com",
  artistLocation: "Melbourne"
};

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.artworkWrapper}>
        <img src={artwork.artwork_21_7} alt="" />
      </div>
      <a className={styles.artist} href={artwork.artistCompanyUrl} target='_blank'>
        <p><strong>Artwork by {artwork.artistName}</strong></p>
        <p><em>{artwork.artistCompany}, {artwork.artistLocation}</em></p>
      </a>
    </div>
  )
}

export default Hero