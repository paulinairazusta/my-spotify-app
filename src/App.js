import { useState } from "react";
import ArtistCard from "./components/ArtistCard";
import "./App.css";
import { getAccessToken } from "./utils/getAccessToken";

function App() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getArtists = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=artist&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const json = await response.json();
    return json;
  };

  const onSearch = async () => {
    setIsLoading(true);
    let data = await getArtists();
    if (data.error?.status === 401) {
      await getAccessToken();
      data = await getArtists();
    }
    setArtists(data.artists.items);
    setIsLoading(false);
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
      <button
        className="Button"
        onClick={onSearch}
        disabled={!search || isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
      <h1 className="Artists-title">
        {artists.length ? "Artists" : "Find your favourite artists"}
      </h1>
      <div className="Grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default App;
