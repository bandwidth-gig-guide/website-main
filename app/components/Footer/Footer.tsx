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
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quis illum ullam cum dolore officiis odit vel, quisquam quaerat voluptatum at fugit, illo nihil magni inventore! Doloribus officia sit repellat!</p>
					</div>

					<div className={styles.info}>
						<h4>Bandwidth</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<p>Nemo nisi provident atque odit. Quam ea rerum fugit, veniam maiores officiis velit consequuntur laboriosam ipsam.</p>
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
