import { useEffect, useState } from "react";
import LoginButton from "../component/LoginSpotify";
import axios from "axios";

export default function SpotifyPage() {
    const [access_token, set_access_token] = useState(null);
    const [query, set_query] = useState('');

    function getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    useEffect(() => {
        let params = getHashParams()
        let token = params.access_token;
        set_access_token(token);
    });

    async function handleClick() {
        try {
            let url = 'https://api.spotify.com/v1/search?q=' + query + '&type=track,artist';
            let { data } = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
            })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-auto">
                <div className="flex items-center">
                    <LoginButton />
                </div>
                <div className="w-full">
                    <input
                        onChange={(event) => { set_query(event.target.value) }}
                        value={query} type="text"
                        className="bg-white px-2 py-1 rounded-bl rounded-tl w-80 mb-3"
                        placeholder="Type anything..."></input>
                    <button onClick={() => { handleClick() }} className="bg-spotify_main hover:bg-gray-600 px-2 py-1 mb-3 text-white rounded-br rounded-tr"><i className="fa fa-search"></i></button>
                </div>
            </div>
        </>
    );

}