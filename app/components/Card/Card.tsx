import ArtistCard from "./Artist/ArtistCard"
import EventCard from "./Event/EventCard"
import VenueCard from "./Venue/VenueCard"

type Props = {
    ArtistID?: string;
    EventID?: string;
    VenueID?: string;
};

const Card: React.FC<Props> = ({ ArtistID, EventID, VenueID }) => {
    if (ArtistID) return <ArtistCard ArtistID={ArtistID} />;
    if (EventID) return <EventCard EventID={EventID} />;
    if (VenueID) return <VenueCard VenueID={VenueID} />;
    return null;
};

export default Card;