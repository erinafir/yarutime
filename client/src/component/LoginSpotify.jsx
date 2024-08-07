import { Link } from "react-router-dom";

export default function LoginButton () {

    let client_id = '06ed8f4b7e9d47ca86218a51bab856b9';
    let scope = 'playlist-modify-private';
    let redirect_uri = 'http://localhost:5173/app/spotify/callback';

    let spotify_url = 'https://accounts.spotify.com/authorize';
    spotify_url += '?response_type=token';
    spotify_url += '&client_id=' + encodeURIComponent(client_id);
    spotify_url += '&scope=' + encodeURIComponent(scope);
    spotify_url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    console.log(spotify_url, ',,,,,,,');

    return (
      <Link to={spotify_url} className="bg-spotify_main hover:bg-gray-600 w-60 rounded-full text-white font-medium px-1 py-1 flex cursor-pointer justify-center align-middle">
          LOG IN WITH SPOTIFY
        </Link>
    )
  }