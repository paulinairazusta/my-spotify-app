import { useParams } from "react-router-dom";
import "./ArtistPage.css";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";

function Artist() {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const json = await response.json();
      setAlbums(json.items);
    }
    getAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Albums-container">
      <h1 className="Albums-title">Albums</h1>
      <div className="Grid">
        {albums.map((album) => (
          <AlbumCard album={album} />
        ))}
      </div>
    </div>
  );
}

export default Artist;
