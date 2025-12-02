import Link from "next/link";
import { routes } from "./Routes";
import styles from './MobileMenuDrawer.module.css'

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuDrawer: React.FC<Props> = ({ isOpen, setIsOpen }) => {

  return (
    <div
      className={`${styles.wrapper} ${isOpen ? styles.open : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <aside
        className={styles.drawerWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.topRow}>
          <div className={styles.menuToggle} onClick={() => setIsOpen(false)}>
            <span />
            <span />
          </div>
        </div>

        <ul>
          {routes.map(route => (
            <Link key={route.label} href={route.href} onClick={() => setIsOpen(false)}>
              <li >
                {route.label}
              </li>
            </Link>

          ))}
        </ul>
      </aside>
    </div>
  );
}

export default MobileMenuDrawer
