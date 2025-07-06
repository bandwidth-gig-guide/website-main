type Social = {
//  specializedId: uuid
    socialPlatform: string;
    handle: string;
    url: string;
};

export type ArtistSocial = {
    artistId: uuid;
} & Social;

export type VenueSocial = {
    venueId: uuid;
} & Social;

export type EventSocial = {
    eventId: uuid;
} & Social;