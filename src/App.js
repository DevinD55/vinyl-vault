import './sass/App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import RecordList from './components/RecordList';
import RecordPlayer from './components/RecordPlayer';
import ActiveRecord from './components/ActiveRecord';

function App() {

  // Getting Spotify Access Token to Make API Calls
  const client_id = '84a84ca340e64cfdae61428e61746205';
  const redirect_uri = 'vinyl-vault/oops.netlify.app';
  const client_secret = '5e6a9b18ecc349879fc15a74a7c8e846';

  const [accessToken , setAccessToken] = useState('');

  useEffect(() => {
      var authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
      }

      fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then( data => setAccessToken(data.access_token))
      }, [])
      
  console.log('here be the access token', accessToken);

  const [playAlbumId, setPlayAlbumId] = useState('')

  const body = document.body
  
  const getAlbumId = (event) => {
    if (event.target.classList.contains('albumCover')) {
        console.log(event.target)
        setPlayAlbumId(event.target.parentElement.parentElement.children[1].children[3].innerHTML);
        console.log(playAlbumId);
      } else {
        setPlayAlbumId('');
        console.log('no clicky on an album');
      }
    };
  
  body.addEventListener('click', getAlbumId)

  console.log(playAlbumId)

  return (
    <div className="App">
      <Header/>
      <RecordList
        accessToken={accessToken}
        playAlbumId = {playAlbumId}
        setPlayAlbumId = {setPlayAlbumId}
        getAlbumId = {getAlbumId}
      />
      {playAlbumId && <ActiveRecord
        accessToken={accessToken}
        playAlbumId = {playAlbumId}
        setPlayAlbumId = {setPlayAlbumId}
        getAlbumId = {getAlbumId}
      />}
      <RecordPlayer 
      accessToken={accessToken}
      playAlbumId = {playAlbumId}
      />
    </div>
  );
}

export default App;
