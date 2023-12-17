import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./AlbumPage.css";
import avatar from "../../avatar.png";

function AlbumPage() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const location = useLocation();
  const album = location.state.album;

  useEffect(() => {
    async function getTracks() {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const json = await response.json();
      setTracks(json.items);
    }
    getTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
       <img
          src={album.images[2]?.url ?? avatar}
          alt="Artist avatar"
          className="Card-image"
        />
      <p>{album.name}</p>
      <div className="Tracks-container">
        {tracks.map((track) => (
          <p className="Track">{track.name}</p>
        ))}
      </div>
    </div>
  );
}

export default AlbumPage;
