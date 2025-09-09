import React from 'react';
import styles from "./Banner.module.css";
import Link from "next/link";

const bannerImages = [
  "/banners/banner-01.jpg",
  "/banners/banner-02.jpg",
  "/banners/banner-03.jpg",
  "/banners/banner-04.jpg",
];

function getRandomBanner() {
  const idx = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[idx];
}

const Banner = () => {
  const randomBanner = getRandomBanner();
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Link href="/">
          <div className={styles.banner}>
            <img
              src={randomBanner}
              alt="Banner"
              className={styles.bannerImage}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Banner;