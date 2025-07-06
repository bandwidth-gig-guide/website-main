import Link from "next/link";

const VenueCard: React.FC<{ VenueID: string }> = ({ VenueID }) => {
    return (
        <div>
            <Link href={`/venue/${VenueID}`}>
                <p>VenueCard: { VenueID }</p>
            </Link>
        </div>
    );
};

export default VenueCard;