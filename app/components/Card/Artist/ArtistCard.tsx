import Link from "next/link"

const ArtistCard: React.FC<{ artistId: string }> = ({ artistId }) => {
    return (
        <div>
            <Link href={`/artist/${ artistId }`}>
                <p>ArtistCard: { artistId }</p>
            </Link>
        </div>
    );
};

export default ArtistCard;