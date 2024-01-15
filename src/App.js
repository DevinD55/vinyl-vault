import "./sass/App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Header2 from "./components/Header2";
import RecordList2 from "./components/RecordList2";
import ActiveRecord from "./components/ActiveRecord";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Player from "./components/Player";
import RecommendedList from "./components/RecommendedList";

function App() {
  // Getting Spotify Access Token to Make API Calls
  const client_id = "84a84ca340e64cfdae61428e61746205";
  const redirect_uri = "vinyl-vault/oops.netlify.app";
  const client_secret = "5e6a9b18ecc349879fc15a74a7c8e846";

  const [accessToken, setAccessToken] = useState("");

  const scopes=[
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify"
  ]

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret,
        "&scope": scopes.join(' '),
      };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);


  const [playAlbumId, setPlayAlbumId] = useState("");

  const body = document.body;

  const getAlbumId = (event) => {
    if (event.target.classList.contains("albumCover")) {
      setPlayAlbumId(
        event.target.parentElement.parentElement.children[1].children[3]
          .innerHTML
      );
    } else {
      setPlayAlbumId("");
    }
  };

  body.addEventListener("click", getAlbumId);

  const hideActiveAlbum = () => {
    setPlayAlbumId("");
  };

  return (
    <Router>
      <div className="App wrapper">
        <Header2 />
        <RecordList2 accessToken={accessToken} getAlbumId={getAlbumId}/>
        {/* <Player accessToken={accessToken} /> */}
      </div>
    </Router>
  );
}

export default App;
