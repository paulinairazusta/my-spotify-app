const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", process.env.REACT_APP_CLIENT_ID);
data.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);

export async function getAccessToken() {
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
