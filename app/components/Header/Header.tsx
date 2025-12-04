import { useState, useEffect } from 'react'
import Link from "next/link";
import { MobileMenuDrawer, SearchBar, FloatingSearchBar } from "@/components"
import { LocationScope } from "@/enums";
import { routes } from './Routes'
import styles from './Header.module.css'


interface Props {
	location: LocationScope;
}

const Header: React.FC<Props> = ({ location }) => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isMobileMenuDrawerOpen, setIsMobileMenuDrawerOpen] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

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
					<SearchBar />
				</nav>
				<div className={styles.menuToggle} onClick={() => setIsMobileMenuDrawerOpen(!isMobileMenuDrawerOpen)}>
					<span />
					<span />
					<span />
				</div>
			</header>

			{isMobile &&
				<>
					<MobileMenuDrawer
						isOpen={isMobileMenuDrawerOpen}
						setIsOpen={setIsMobileMenuDrawerOpen}
					/>

					<FloatingSearchBar />
				</>
			}

		</div >
	);
};

export default Header;
