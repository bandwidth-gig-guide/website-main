import React from 'react'
import { EventPrice } from '../../types/models/EventPrice'
import styles from './TIckets.module.css'

interface Props {
    prices: EventPrice[];
    ticketSaleUrl: url;
    originalPostUrl: url;
}

const Tickets: React.FC<Props> = ({ prices, ticketSaleUrl, originalPostUrl }) => {
  return (
    <div className={styles.wrapper}>
        <a className={styles.button} href={ticketSaleUrl} target='_blank'>Get Tickets</a>
        <div className={styles.spacer}></div>
        <p className={styles.disclaimer}>
          * This event may be 18+. Information presented on this page may be false or outdated. 
          Always check with the <a href={originalPostUrl}>official listing</a> before purchasing 
          tickets for any event.
        </p>
    </div>
  )
}

export default Tickets