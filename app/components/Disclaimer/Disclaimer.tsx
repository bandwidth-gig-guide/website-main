import React, { useState } from 'react'
import { pipes } from "./pipes"
import styles from "./Disclaimer.module.css"


const Disclaimer = () => {
  const [snackbar, setSnackbar] = useState<string | null>(null)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setSnackbar(`Email address copied: ${text}`)
      setTimeout(() => setSnackbar(null), 5000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.middleWrapper}>
        <div className={styles.innerWrapper}>
          <h3>Bandwidth is a grassroots project, and we get a lot of stuff wrong!</h3>
          <p>We keep our records as accurate as possible, but we're not always up-to-date, and we don't track every venue in Melbourne <em>(yet).</em></p>
          <p>Your support is what allows us to keep this going! If you notice anything that needs updating, <em>please</em> reach out on any of the following pipes, and we'll get right on it!</p>
          
          <div className={styles.pipes}>
            {pipes.map((pipe) => (
              <div key={pipe.label} className={styles.pipe}>
                {pipe.href ? (
                  <a href={pipe.href} target="_blank" rel="noopener noreferrer">
                    <img src={pipe.image} alt={pipe.label} />
                  </a>
                ) : (
                  <button
                    className={styles.pipeButton}
                    onClick={() => pipe.text && handleCopy(pipe.text)}
                  >
                    <img src={pipe.image} alt={pipe.label} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <p>Always check out the socials and official postings for the latest updates and events we might have missed!</p>

          {snackbar && (
            <div className={styles.snackbar}>
              {snackbar}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
