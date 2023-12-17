import { Link } from "react-router-dom";
import "./AlbumCard.css";
import avatar from "../../avatar.png";

function AlbumCard({ album }) {
  return (
    <Link state={{ album }} to={`/album/${album.id}`}>
      <div key={album.id} className="Album-card">
        <img
          src={album.images[1]?.url ?? avatar}
          alt="Artist avatar"
          className="Card-image"
        />
        <p className="Card-name">{album.name}</p>
      </div>
    </Link>
  );
}

export default AlbumCard;
