import Link from "next/link";

const VenueCard: React.FC<{ venueId: string }> = ({ venueId }) => {
    return (
        <div>
            <Link href={`/venue/${ venueId }`}>
                <p>VenueCard: { venueId }</p>
            </Link>
        </div>
    );
};

export default VenueCard;