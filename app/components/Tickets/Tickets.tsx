import React from 'react'
import { EventPrice } from '@/types'
import styles from './TIckets.module.css'

interface Props {
  prices: EventPrice[];
  ticketSaleUrl: url;
  originalPostUrl: url;
}

function formatTicketPrice(price: EventPrice): string {
  return price.price === 0 ? "Free Entry" : `$${price.price}`
}

const Tickets: React.FC<Props> = ({ prices, ticketSaleUrl, originalPostUrl }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <a className={styles.button} href={ticketSaleUrl} target='_blank'>Get Tickets</a>
        <div className={styles.spacer} />
        <ul className={styles.pricesList}>
          {prices.map((price, index) => (
            <>
              <li key={index} className={styles.priceItem}>
                <p className={styles.ticketType}>{price.ticketType}</p>
                <p className={styles.price}>{formatTicketPrice(price)}</p>
              </li>
              {/* <div className={styles.spacer} /> */}
            </>
          ))}
        </ul>
        {/* <p className={styles.disclaimer}>
        * This event may be 18+. Information presented on this page may be false or outdated.
        Always check with the <a href={originalPostUrl}>official listing</a> before purchasing
        tickets for any event.
      </p> */}
      </div>

    </div>
  )
}

export default Tickets