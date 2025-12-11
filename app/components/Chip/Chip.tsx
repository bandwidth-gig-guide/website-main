import React from 'react'
import { PageType } from '@/enums';
import { RESERVED_UUIDS } from '@/constants';
import Link from "next/link";
import styles from './Chip.module.css'


interface Props {
  title: string;
  subtitle: string;
  imageUrl: url;
  pageType: PageType;
  id: uuid;
}

const PerformanceTimes: React.FC<Props> = ({ title, subtitle, imageUrl, pageType, id }) => {
  const route = `/${pageType}/${id}`
  const isReserved = Object.values(RESERVED_UUIDS).some(item => item === id);

  const chipContent = (
    <div className={`${styles.wrapper} ${isReserved ? styles.reserved : ''}`}>
      <div className={styles.imgWrapper}>
        <img src={imageUrl} alt={title} />
      </div>
        <div>
          <h5>{title}</h5>
          <h6>{subtitle}</h6>
        </div>
    </div>
  );

  return isReserved ? chipContent : (
    <Link href={route}>
      {chipContent}
    </Link>
  );
}

export default PerformanceTimes