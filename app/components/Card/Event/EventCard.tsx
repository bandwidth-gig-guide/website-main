import Link from "next/link"

const EventCard: React.FC<{ eventId: string }> = ({ eventId }) => {
    return (
        <div>
            <Link href={`/event/${ eventId }`}>
                <p>EventCard: { eventId }</p>
            </Link>
        </div>
    );
};

export default EventCard;