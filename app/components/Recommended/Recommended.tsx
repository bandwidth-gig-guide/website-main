import React, { useEffect, useState } from 'react';
import styles from './Recommended.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import CardGrid from "../CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";
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
    axios.get(`${apiUrl}/${pageType}/recommended/${id}`)
      .then(response => {setIds(response.data)})
  }, [id, pageType])

  return (
    <div className={styles.wrapper}>
      <SectionHeader title='You May Also Like' />
      {pageType == PageType.Artist && <CardGrid artistIds={ids} cardGridType={CardGridType.Row} />}
      {pageType == PageType.Event && <CardGrid eventIds={ids} cardGridType={CardGridType.Row} />}
      {pageType == PageType.Venue && <CardGrid venueIds={ids} cardGridType={CardGridType.Row} />}
      
    </div>
  );
};

export default Recommended;