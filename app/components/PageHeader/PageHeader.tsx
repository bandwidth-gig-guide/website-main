import styles from './PageHeader.module.css'
import { Props } from './Props'


const PageHeader: React.FC<Props> = ({ title, pageType, isFeatured, subtitle }) => {

	const icon = pageType === "Venue" ? '/location-pin.svg' : "";

	return (
		<div className={styles.wrapper}>
			<p className={isFeatured ? styles.isFeatured : styles.topRow}>
				| {isFeatured ? "Featured " : ""}{pageType}
			</p>
			<h2>{title}</h2>
			{subtitle &&
				<div className={styles.bottomRow}>
					<img src={icon} /> {subtitle}
				</div>
			}
		</div>
	)
};

export default PageHeader;
