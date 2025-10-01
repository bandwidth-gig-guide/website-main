import React from 'react';
import styles from './Socials.module.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import { Social } from '../../models/Social';
import { icons } from './Icons';

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
