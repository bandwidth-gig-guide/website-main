import React from "react"
import { SectionHeader } from '@/components';
import styles from "./CityMap.module.css"


const melbourne = "https://www.google.com/maps/d/embed?mid=1XnFb-G5D2UeK2wSUFVqxgBii8aeZ_lQ&ehbc=2E312F"

const CityMap = () => {

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Explore Melbourne" />
      <iframe
        src={melbourne}
        loading='lazy'
      />
    </div>
  );
};

export default CityMap;
