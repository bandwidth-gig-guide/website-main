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
						<div className={styles.siteMapLinks}>
							{routes.map((route, index) => (
								<Link key={index} href={route.href} className={styles.link}>
									{route.label}
								</Link>
							))}
						</div>
						
					</div>

					<div className={styles.faqs}>
						<h4>FAQs</h4>
					</div>

					<div className={styles.info}>
						<h4>Bandwidth</h4>
					</div>

				</div>
				<div className={styles.bottom}>
					<p>&copy; {new Date().getFullYear()} Matthew Cross. All rights reserved.</p>
					<div className={styles.external}>
						<img src="/facebook-white.svg" alt="Facebook" />
						<img src="/instagram-white.svg" alt="Instagram" />
						<img src="/discord-white.svg" alt="Discord" />
						<img src="/github-white.svg" alt="GitHub"/>
					</div>
				</div>
			</footer>
		</div>

	);
};

export default Footer;
