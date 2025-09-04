import styles from './DateHeader.module.css'
import { Props } from './Props'


const SectionHeader: React.FC<Props> = ({ date }) => {
	return (
			<div className={styles.wrapper}>
				<div className={styles.titleWrapper}>
						<h2>{date}</h2>
				</div>
			</div>
	)
};

export default SectionHeader;
