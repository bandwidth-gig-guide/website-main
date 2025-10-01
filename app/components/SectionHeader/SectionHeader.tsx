import Link from "next/link";
import styles from './SectionHeader.module.css'
import { Props } from './Props'


const SectionHeader: React.FC<Props> = ({ title, route, scrollToTopOnClick }) => {

	return (
		<div className={styles.wrapper}>
			{route ? (
				<Link href={route} className={styles.title}>
					<h2>{title}</h2>
					<p>(see&nbsp;all)</p>
				</Link>
			) : (
				<h2>{title}</h2>
			)}
			<img src="/icons/arrow-down-left.svg" alt="Arrow down left" />
		</div>
	)
};

export default SectionHeader;
