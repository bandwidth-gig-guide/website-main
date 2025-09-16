import styles from './PageHeader.module.css'
import { PageType } from '../../types/enums/PageType'

interface Props {
	title: string;
	pageType: PageType;
	isFeatured?: boolean;
	subtitle?: string;
	getTicketsUrl?: url;
	minTicketPrice?: number | null;
};

const PageHeader: React.FC<Props> = ({ title, pageType, isFeatured,  subtitle, getTicketsUrl, minTicketPrice }) => {

	const icon = pageType === "venue" ? '/location-pin.svg' : "";
	const pageTypeUppercase = pageType.charAt(0).toUpperCase() + pageType.slice(1)

	const recordType = minTicketPrice === 0
			? `| Free Event`
			: isFeatured
				? `| Featured ${pageTypeUppercase}`
				: `| ${pageTypeUppercase}`;

	const priceString = minTicketPrice === 0 || minTicketPrice === null
		? `Get Tickets`
		: `Tickets from $${minTicketPrice}`

	return (
		<div className={styles.wrapper}>
			<p className={styles.topRow}>
				<span className={isFeatured || minTicketPrice === 0 ? styles.accentColor : ""}>{recordType}</span>
			</p>
			<div className={styles.middleRow}>
				<h2>{title}</h2>
				{getTicketsUrl && <button onClick={() => window.open(getTicketsUrl, '_blank')}>{priceString}</button>}
			</div>
			{subtitle &&
				<div className={styles.bottomRow}>
					{icon && <img src={icon} />}{subtitle}
				</div>
			}
		</div>
	)
};

export default PageHeader;
