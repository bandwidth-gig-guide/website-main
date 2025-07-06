import Link from "next/link"

const EventCard: React.FC<{ EventID: string }> = ({ EventID }) => {
    return (
        <div>
            <Link href={`/event/${EventID}`}>
                <p>EventCard: { EventID }</p>
            </Link>
        </div>
    );
};

export default EventCard;