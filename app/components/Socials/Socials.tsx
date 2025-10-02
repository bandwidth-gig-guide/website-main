import React from 'react';
import { SectionHeader } from '@/components';
import { Social } from '@/types';
import { icons } from './Icons';
import styles from './Socials.module.css';


interface Props {
  socials: Social[];
}

const Socials: React.FC<Props> = ({ socials = [] }) => {

  if (socials.length == 0) return

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Socials" />
      <div className={styles.grid}>
        {socials.map((social, index) => {
          const iconSrc = icons[social.socialPlatform as keyof typeof icons] ?? icons.default;
          return (
            <a key={index} href={social.url} target='_blank'>
              <img src={iconSrc} alt={social.socialPlatform} />
              <span>{social.handle}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Socials;
