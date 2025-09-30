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
						<div className={styles.accordion}>
							<details>
								<summary>What is Bandwidth?</summary>
								<p>
									Bandwidth is the definitive Melbourne Gig Guide website that let's you search for
									upcoming events, local venues, and your favorite artists.
								</p>
							</details>
							<details>
								<summary>How do we decide which artists to include?</summary>
								<p>
									Artists are added to our database when they are first identified as performing a
									gig at a venue in Melbourne. If your favorite artist isn't on the site yet, tell
									them to start playing some gigs in Melbourne!
								</p>
							</details>
							<details>
								<summary>Why can't I see my favorite venue on here?</summary>
								<p>
									Gathering information takes time! The more venues we track, the long it takes each
									week. We're growing slowly, and making sure to only add more venues when we're
									confident that we can handle the load.
								</p>
							</details>
						</div>
					</div>

					<div className={styles.info}>
						<h4 className={styles.title}>Bandwidth</h4>
						<p className={styles.tagline}>Melbourne Gig Guide</p>
						<p><strong>SITE UNDER DEVELOPMENT</strong></p>
						<p>Check back for the official release on:</p>
						<p>Dec 01, 2025</p>
						<br />
						<p><em>"It's not poorly designed, it's punk"</em></p>
					</div>

				</div>
				<div className={styles.bottom}>
					<p>&copy; {new Date().getFullYear()} Matthew Cross. All rights reserved.</p>
					<div className={styles.external}>
						<img src="/facebook-white.svg" alt="Facebook" />
						<img src="/instagram-white.svg" alt="Instagram" />
						<img src="/discord-white.svg" alt="Discord" />
						<img src="/github-white.svg" alt="GitHub" />
					</div>
				</div>
			</footer>
		</div>

	);
};

export default Footer;
