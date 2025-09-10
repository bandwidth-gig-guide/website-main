import React, { useEffect, useState } from 'react';
import styles from './Recommended.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import CardRow from "../CardRow/CardRow";
import { PageType } from '../../types/enums/PageType';

// External
import axios from "axios"

// Config
import apiUrl from "../../api.config"

interface Props {
  id: uuid;
  pageType: PageType;
}

const Recommended: React.FC<Props> = ({ id, pageType }) => {
  const [ids, setIds] = useState<uuid[]>([]);

  useEffect(() => {
    if (id === undefined || pageType === undefined) return;

    axios.get(`${apiUrl}/${pageType}/recommended/${id}`)
      .then(response => {setIds(response.data)})
  }, [id, pageType])

  return (
    <div className={styles.wrapper}>
      <SectionHeader title='You May Also Like' />
      {pageType == PageType.Artist && <CardRow artistIds={ids} />}
      {pageType == PageType.Event && <CardRow eventIds={ids} />}
      {pageType == PageType.Venue && <CardRow venueIds={ids} />}
      
    </div>
  );
};

export default Recommended;