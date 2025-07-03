type Type = {
//  SpecializedID: string
    Type: string;
};

export type ArtistType = {
    ArtistID: string;
} & Type;

export type VenueType = {
    VenueID: string;
} & Type;

export type EventType = {
    EventID: string;
} & Type;