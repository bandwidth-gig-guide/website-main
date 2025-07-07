import Link from "next/link";
import styles from './SectionHeader.module.css'
import { Props } from './Props'


const SectionHeader: React.FC<Props> = ({ title, route }) => {
	return (
			<div className={styles.wrapper}>
				<div className={styles.title}>
					{route ? (
						<Link href={route}>
								<h2>{title}</h2>
								<p>(see all)</p>
						</Link>
					) : (
						<h2>{title}</h2>
					)}
				</div>
				<img src="/arrow-down-left.svg" alt="Arrow down left" />
			</div>
	)
};

export default SectionHeader;
