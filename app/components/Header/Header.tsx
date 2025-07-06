import Link from "next/link";
import styles from './Header.module.css'
import { routes } from './Routes'

const Header = () => {
    return (
        <nav className={styles.wrapper}>
            <ul>
                {routes.map(route => (
                    <li key={route.label} >
                        <Link href={route.href}>{route.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Header;
