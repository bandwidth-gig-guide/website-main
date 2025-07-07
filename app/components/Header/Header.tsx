import Link from "next/link";
import styles from './Header.module.css'
import { routes } from './Routes'

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<header>
				<Link href="/"><h1>Bandwidth</h1></Link>
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
		</div>
	);
};

export default Header;
