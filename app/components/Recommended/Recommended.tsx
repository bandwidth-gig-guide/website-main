import React, { useEffect, useState } from 'react';
import styles from './Recommended.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import CardGrid from "../CardGrid/CardGrid";
import { PageType } from '../../types/enums/PageType';

// External
import axios from "axios"

// Config
import { getServicePublicApiUrl } from "../../util/runtime_vars/getServicePublicApiUrl";

interface Props {
  id: uuid;
  pageType: PageType;
}

const Recommended: React.FC<Props> = ({ id, pageType }) => {
  const [ids, setIds] = useState<uuid[]>([]);

  useEffect(() => {
    if (id === undefined || pageType === undefined) return;

    const fetchRecommended = async () => {
      try {
        const api = await getServicePublicApiUrl();
        const response = await axios.get(`${api}/${pageType}/recommended/${id}`);
        setIds(response.data);
      } catch {
        
      }
    }

    fetchRecommended();
  }, [id, pageType])

  return (
    <div className={styles.wrapper}>
      <SectionHeader title='You May Also Like' route={`/${pageType}`}/>
      {pageType == PageType.Artist && <CardGrid artistIds={ids} limit={8}/>}
      {pageType == PageType.Event && <CardGrid eventIds={ids} limit={8}/>}
      {pageType == PageType.Venue && <CardGrid venueIds={ids} limit={8}/>}
      
    </div>
  );
};

export default Recommended;