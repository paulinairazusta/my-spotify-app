import { useEffect, useState } from "react";
import ArtistCard from "./components/ArtistCard";
import "./App.css";

const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", "e3f050682d27442195582e5d08e8e98d");
data.append("client_secret", "3914d4c498444a48aa95f0645021faa3");

function App() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function getAccessToken() {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
      const json = await response.json();
      localStorage.setItem("accessToken", json.access_token);
    }
    getAccessToken();
  }, []);

  const onSearch = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=artist&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const json = await response.json();
    setArtists(json.artists.items);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="App-header-title">My Spotify App</h2>
      </header>
      <input
        className="Input"
        placeholder="Ex: Amy Winehouse"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && search) {
            onSearch();
          }
        }}
      />
      <button className="Button" onClick={onSearch} disabled={!search}>
        Search
      </button>
      <h1 className="Artists-title">Artists</h1>
      <div className="Grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default App;
