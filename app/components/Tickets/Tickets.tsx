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
        {prices.map((ticket, index) => (
            <React.Fragment key={index}>
                <span className={styles.ticket}>{ticket.ticketType} | ${ticket.price}</span>
                {index < prices.length - 1 && <span className={styles.dot}>&nbsp;&middot;&nbsp;</span>}
            </React.Fragment>
        ))}
    </div>
  )
}

export default Tickets