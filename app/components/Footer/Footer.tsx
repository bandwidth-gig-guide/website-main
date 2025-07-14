import styles from './Footer.module.css'
import Link from "next/link";
import { routes } from './Routes'


const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<footer>
				<div className={styles.top}>

					<div className={styles.siteMap}>
						<h4>Site Map</h4>
					</div>

					<div className={styles.faqs}>
						<h4>FAQs</h4>
					</div>

					<div className={styles.info}>
						<h4>Bandwidth</h4>
					</div>

				</div>
				<div className={styles.bottom}>
					<p>All right reserved</p>
					<div className={styles.external}>
						<img src="/date.svg" alt="GitHub" />
						<img src="/date.svg" alt="Discord" />
						<img src="/facebook.svg" alt="Facebook" />
						<img src="/instagram.svg" alt="Instagram" />
					</div>
				</div>
			</footer>
		</div>

	);
};

export default Footer;
