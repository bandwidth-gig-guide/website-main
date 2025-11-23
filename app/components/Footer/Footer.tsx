import Link from "next/link";
import { internalRoutes, externalRoutes } from './route'
import { faqs } from './faqs'
import styles from './Footer.module.css'

const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<footer>
				<div className={styles.top}>

					<div className={styles.siteMap}>
						<h4>Site Map</h4>
						<div className={styles.siteMapLinks}>
							{internalRoutes.map((route, index) => (
								<Link key={index} href={route.href} className={styles.link}>
									{route.label}
								</Link>
							))}
						</div>

					</div>

					<div className={styles.faqs}>
						<h4>FAQs</h4>
						<div className={styles.accordion}>
							{faqs.map((question, index) => (
								<details key={index}>
									<summary>{question.title}</summary>
									<p>{question.content}</p>
								</details>
							))}
						</div>
					</div>

					<div className={styles.info}>
						<h4 className={styles.title}>Bandwidth</h4>
						<p className={styles.tagline}>Melbourne Gig Guide</p>
						<p><strong>SITE UNDER DEVELOPMENT</strong></p>
						<br />
						<p><em>"It's not poorly designed, it's punk"</em></p>
					</div>

				</div>
				<div className={styles.bottom}>
					<p>&copy; {new Date().getFullYear()} <a href="https://www.linkedin.com/in/matthew-cross-b02b9a268/" target="blank">Matthew Cross</a>. All rights reserved.</p>
					<div className={styles.external}>
						{externalRoutes.map((route, index) => (
							<a key={index} href={route.href} target="blank">
								<img src={`/icons/${route.img}`} alt={route.label} />
							</a>
						))}
					</div>
				</div>
			</footer>
		</div>

	);
};

export default Footer;
