import Link from "next/link";
import { LocationScope } from "@/enums";
import { routes } from './Routes'
import styles from './Header.module.css'


interface Props {
	location: LocationScope;
}

const Header: React.FC<Props> = ({ location }) => {
	return (
		<div className={styles.wrapper}>
			<header>
				<Link href="/" className={styles.siteName}>
					<h1>Bandwidth</h1>
					<p>Melbourne Gig Guide</p>
				</Link>
				<nav>
					<ul>
						{routes.map(route => (
							<li key={route.label}>
								<Link href={route.href}>{route.label}</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className={styles.menuToggle}>
					<span />
					<span />
					<span />
				</div>
			</header>
		</div >
	);
};

export default Header;
