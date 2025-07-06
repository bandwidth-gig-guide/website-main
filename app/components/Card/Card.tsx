import ArtistCard from "./Artist/ArtistCard"
import EventCard from "./Event/EventCard"
import VenueCard from "./Venue/VenueCard"

type Props = {
    artistId?: string;
    eventId?: string;
    venueId?: string;
};

const Card: React.FC<Props> = ({ artistId, eventId, venueId }) => {
    if (artistId) return <ArtistCard artistId={artistId} />;
    if (eventId) return <EventCard eventId={eventId} />;
    if (venueId) return <VenueCard venueId={venueId} />;
    return null;
};

export default Card;