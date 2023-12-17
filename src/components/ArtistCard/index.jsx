import { Link } from "react-router-dom";
import "./ArtistCard.css";
import avatar from "../../avatar.png";

function Artist({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="Card">
        <img
          src={artist.images[2]?.url ?? avatar}
          alt="Artist avatar"
          className="Card-image"
        />
        <p className="Card-name">{artist.name}</p>
        {artist.genres[0] && (
          <span className="Card-tag">{artist.genres[0]}</span>
        )}
      </div>
    </Link>
  );
}

export default Artist;
