import styles from './PageHeader.module.css'
import { PageType } from '../../types/enums/PageType'

interface Props {
	title: string;
	pageType: PageType;
	isFeatured?: boolean;
	isFreeEvent?: boolean;
	subtitle?: string;
};

const PageHeader: React.FC<Props> = ({ title, pageType, isFeatured, isFreeEvent, subtitle }) => {

	const icon = pageType === "venue" ? '/location-pin.svg' : "";
	const pageTypeUppercase = pageType.charAt(0).toUpperCase() + pageType.slice(1)

	const formattedTopRow = isFeatured
		? `| Featured ${pageTypeUppercase}`
		: isFreeEvent
			? "| Free Event"
			: `| ${pageTypeUppercase}`;

	return (
		<div className={styles.wrapper}>
			<p className={isFeatured || isFreeEvent ? styles.accentColor : styles.topRow}>
				{formattedTopRow}
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
