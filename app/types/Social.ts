type Social = {
//  specializedId: string
    socialPlatform: string;
    handle: string;
    url: string;
};

export type ArtistSocial = {
    artistId: string;
} & Social;

export type VenueSocial = {
    venueId: string;
} & Social;

export type EventSocial = {
    eventId: string;
} & Social;