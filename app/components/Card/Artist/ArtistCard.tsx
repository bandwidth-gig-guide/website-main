import Link from "next/link"

const ArtistCard: React.FC<{ ArtistID: string }> = ({ ArtistID }) => {
    return (
        <div>
            <Link href={`/artist/${ArtistID}`}>
                <p>ArtistCard: { ArtistID }</p>
            </Link>
        </div>
    );
};

export default ArtistCard;