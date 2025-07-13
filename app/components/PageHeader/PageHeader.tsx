import styles from './PageHeader.module.css'
import { PageType } from '../../types/enums/PageType'

interface Props {
	title: string;
	pageType: PageType;
	isFeatured?: boolean;
	subtitle?: string;
};

const PageHeader: React.FC<Props> = ({ title, pageType, isFeatured, subtitle }) => {

	const icon = pageType === "venue" ? '/location-pin.svg' : "";
	const type = pageType.charAt(0).toUpperCase() + pageType.slice(1)

	return (
		<div className={styles.wrapper}>
			<p className={isFeatured ? styles.isFeatured : styles.topRow}>
				| {isFeatured ? "Featured " : ""}{type}
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
