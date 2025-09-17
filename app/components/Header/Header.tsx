import Link from "next/link";
import styles from './Header.module.css'
import { routes } from './Routes'
import { LocationScope } from "../../types/enums/LocationScope";

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
			</header>
		</div >
	);
};

export default Header;
