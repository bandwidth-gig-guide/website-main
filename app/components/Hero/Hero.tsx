import React from 'react';
import styles from "./Hero.module.css";

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const artwork = {
  artwork_21_7: "",
  artwork_24_36: "", 
  artistName: "Marilyn Monroe",
  artistCompany: "Freelance Graphic Designer",
  artistCompanyUrl: "https://google.com",
  artistLocation: "Melbourne"
};

const Hero = () => {
  const randomColor = getRandomColor()
  return (
    <div className={styles.wrapper}>
      <div className={styles.artwork} style={{ background: randomColor }}>
        Hero
      </div>
      <a className={styles.artist} href={artwork.artistCompanyUrl} target='_blank'>
        <p><strong>{artwork.artistName}</strong></p>
        <p><em>{artwork.artistCompany}, {artwork.artistLocation}</em></p>
      </a>
    </div>
  )
}

export default Hero