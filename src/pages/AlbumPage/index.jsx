import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./AlbumPage.css";
import avatar from "../../avatar.png";

function AlbumPage() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const location = useLocation();
  const album = location.state.album;
  console.log(album);

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
    <main className="Page-container">
      <div className="Album-container">
        <div>
          <img
            src={album.images[0]?.url ?? avatar}
            alt="Album cover"
            className="Album-cover"
          />
          <div className="Album-info">
            <p>{album.name}</p>
            <p className="Album-date">Release date: {album.release_date}</p>
          </div>
        </div>
        <div>
          <ol>
            {tracks.map((track) => (
              <li key={track.id} className="Track">
                <p>{track.name}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}

export default AlbumPage;
