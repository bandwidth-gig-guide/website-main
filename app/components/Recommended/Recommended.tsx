import React, { useEffect, useState } from 'react';
import { CardGrid, SectionHeader } from '@/components';
import { PageType } from '@/enums';
import getConfig from 'next/config';
import axios from 'axios'
import styles from './Recommended.module.css'


interface Props {
  id: uuid;
  pageType: PageType;
}

const Recommended: React.FC<Props> = ({ id, pageType }) => {
  const [ids, setIds] = useState<uuid[]>([]);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  useEffect(() => {
    if (id === undefined || pageType === undefined) return;

    axios.get(`${api}/${pageType}/recommended/${id}`)
      .then(response => {setIds(response.data)})
  }, [id, pageType])

  return (
    <div className={styles.wrapper}>
      <SectionHeader title='You May Also Like' route={`/${pageType}`}/>
      {pageType == PageType.Artist && <CardGrid artistIds={ids}/>}
      {pageType == PageType.Event && <CardGrid eventIds={ids}/>}
      {pageType == PageType.Venue && <CardGrid venueIds={ids}/>}
      
    </div>
  );
};

export default Recommended;