export type ArtistCard = {
  artistId: uuid;
  title: string;
  country: string;
  city: string;
	isFeatured: boolean;
	imageUrl?: string;
	upcomingEvents: number;
};