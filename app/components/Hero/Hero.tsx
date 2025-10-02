import React from 'react';
import Link from "next/link";
import styles from "./Hero.module.css";


const artwork = {
  artwork_21x7: "./heros/0001-21x7.png",
  artwork_24x36: "",
  artistName: "Matthew Cross",
  artistCompany: "Freelance Graphic Designer",
  artistCompanyUrl: "http://localhost/about",
  artistLocation: "Melbourne"
};

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/about">
        <div className={styles.artworkWrapper}>
          <img src={artwork.artwork_21x7} alt={`${artwork.artistName}, ${artwork.artistCompany}`} />
        </div>
      </Link>
      <a className={styles.artist} href={artwork.artistCompanyUrl} >
        <p><strong>Artwork by {artwork.artistName}</strong></p>
        <p><em>{artwork.artistCompany}, {artwork.artistLocation}</em></p>
      </a>
    </div>
  )
}

export default Hero