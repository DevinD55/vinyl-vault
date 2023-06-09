import { useState, useEffect } from "react"
import axios from "axios";
import SingleRecord from "./SingleRecord";
import { getDatabase, ref, onValue, child, get} from 'firebase/database';
import app from '../firebase.js'

const RecordList = (props) => {

    const {accessToken, playAlbumId, setPlayAlbumId, getAlbumId} = props;

    // Variable to hold db details:
    const database = getDatabase(app);
    // Variable that references our db:
    const dbRef = ref(database);
    const [recordListState, setRecordListState] = useState([]);

// Scans the firebase database to check if there are records available.
    useEffect(() => {
        get(child(dbRef , 'recordCollection')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setRecordListState(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })
    }, [dbRef])
    


// scan over the recordListState and make an axios call for each object inside
    useEffect(()=> {
        for (let key in recordListState) {
            const recordId = recordListState[key].id

            axios('https://api.spotify.com/v1/albums/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                params: {
                    ids: recordId,
                }
            }).then(data => {
                const ulElement = document.getElementById('recordDisplay')
                console.log(data.data.albums[0])
                const album = data.data.albums[0];
                const albumName = album.name;
                const artistName = album.artists[0].name;
                const albumCover = album.images[1].url;
                const albumRelease = album.release_date;
                const openLink = album.external_urls.spotify;
                const albumId = album.id
                
                const liElement = document.createElement('li');
                liElement.innerHTML = `
                <div class='recordTextContainer'>
                    <h2 class='albumName'>${albumName}</h2>
                    <h3 class='artistName'>${artistName}</h3>
                    <h3>${albumRelease}</h3>
                    <h3 class='idText'>${albumId}
                    
                </div>
                <div class='coverLinkContainer' >
                    <img class='albumCover' src='${albumCover}' onClick={getAlbumId}/>
                </div>
                `;
                liElement.className = 'singleRecord'
                ulElement.appendChild(liElement);
            });
        }
    },[recordListState])

        return (
            <>
            <ul id='recordDisplay'className='wrapper'>
                
            </ul>
            
            
            </>
            
        )

}


export default RecordList