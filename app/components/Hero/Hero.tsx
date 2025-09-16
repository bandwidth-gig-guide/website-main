import React from 'react';
import styles from "./Hero.module.css";

const artwork = {
  artwork_21_7: "./heros/0001-21x7.png",
  artwork_24_36: "", 
  artistName: "Matthew Cross",
  artistCompany: "Freelance Graphic Designer",
  artistCompanyUrl: "http://localhost/about",
  artistLocation: "Melbourne"
};

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.artworkWrapper}>
        <img src={artwork.artwork_21_7} alt="" />
      </div>
      <a className={styles.artist} href={artwork.artistCompanyUrl} >
        <p><strong>Artwork by {artwork.artistName}</strong></p>
        <p><em>{artwork.artistCompany}, {artwork.artistLocation}</em></p>
      </a>
    </div>
  )
}

export default Hero