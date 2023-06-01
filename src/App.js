import './sass/App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import RecordList from './components/RecordList';

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
      
  console.log('here be the access token', accessToken)
  return (
    <div className="App">
      <RecordList
        accessToken={accessToken}
      />
    </div>
  );
}

export default App;
