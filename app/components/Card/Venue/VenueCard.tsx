import Link from "next/link";

const VenueCard: React.FC<{ venueId: uuid }> = ({ venueId }) => {
	return (
		<div>
			<Link href={`/venue/${venueId}`}>
				<p>VenueCard: {venueId}</p>
			</Link>
		</div>
	);
};

export default VenueCard;