import React, { useState } from 'react';
import Link from 'next/link';
import { PageType } from '@/enums';
import { RESERVED_UUIDS } from '@/constants';
import { stringToHex } from '@/utils';
import styles from './Chip.module.css';


const Chip: React.FC<{
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  pageType: PageType;
  id: uuid;
}> = ({
  title,
  subtitle,
  imageUrl,
  pageType,
  id,
}) => {
  const [isValidImage, setIsValidImage] = useState<boolean>(imageUrl !== null);
  const isReserved = Object.values(RESERVED_UUIDS).some(item => item === id);
  const route = `/${pageType}/${id}`;

  return (
    <Link href={route}>
      <div className={`${styles.wrapper} ${isReserved ? styles.reserved : ''}`}>
        <div className={styles.imgWrapper}>
          {isValidImage ? (
            <img src={imageUrl!} alt={title} onError={() => setIsValidImage(false)} />
          ) : (
            <div className={styles.imageFallback} style={{ backgroundColor: stringToHex(title) }}>
              <span>{title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div>
          <h5>{title}</h5>
          <h6>{subtitle}</h6>
        </div>
      </div>
    </Link>
  );
};

export default Chip;
