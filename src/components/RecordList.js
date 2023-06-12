import { useState, useEffect } from "react"
import axios from "axios";
import { getDatabase, ref, onValue, child, get} from 'firebase/database';
import app from '../firebase.js'

const RecordList = (props) => {

    const {accessToken, playAlbumId, setPlayAlbumId, getAlbumId} = props;

    // Variable to hold db details:
    const database = getDatabase(app);
    // Variable that references our db:
    const dbRef = ref(database);
    const [recordListState, setRecordListState] = useState([]);

    // Variable to save the currently selected genre or artist
    const [selectedGenre, setSelectedGenre] = useState('');

    const [dropdownGenreOptions, setDropdownGenreOptions] = useState([]);

    const scannedGenres = [];

    const ulElement = document.getElementById('recordDisplay');

// Scans the firebase database to check if there are records available.
useEffect(() => {
    const fetchData = async () => {
        try {
            const snapshot = await get(child(dbRef, 'recordCollection'));
        if (snapshot.exists()) {
            setRecordListState(snapshot.val());
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
    };

    fetchData();
    }, [dbRef]);

    useEffect(() => {
    const fetchAlbumData = async () => {
        for (let key in recordListState) {
        const recordId = recordListState[key].id;

        try {
            const response = await axios.get('https://api.spotify.com/v1/albums/', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                ids: recordId
            }
        });

        const album = response.data.albums[0];
        const albumName = album.name;
        const artistName = album.artists[0].name;
        const albumCover = album.images[1].url;
        const albumRelease = album.release_date;
        const openLink = album.external_urls.spotify;
        const albumId = album.id;
        const albumGenre = recordListState[key].genre;

        // const ulElement = document.getElementById('recordDisplay');
        const liElement = document.createElement('li');
        liElement.innerHTML = `
        <div class='recordTextContainer'>
            <h2 class='albumName'>${albumName}</h2>
            <h3 class='artistName'>${artistName}</h3>
            <h3>${albumRelease}</h3>
            <h3 class='idText'>${albumId}</h3>
        </div>
        <div class='coverLinkContainer'>
            <img class='albumCover' src='${albumCover}'/>
        </div>
        `;
    
        if (scannedGenres.includes(albumGenre)) {
            console.log('Already scanned this genre!');
        } else {
            scannedGenres.push(albumGenre)
            setDropdownGenreOptions([...scannedGenres]);
        }

        if (selectedGenre.includes(albumGenre)){
            liElement.className = 'singleRecord';
            ulElement.appendChild(liElement);
        } else if (selectedGenre === ''){
            liElement.className = 'singleRecord';
            ulElement.appendChild(liElement);
        }

    } catch (error) {
        console.error(error);
    }
    }
};

    if (recordListState.length > 0) {
        fetchAlbumData();
    }
}, [recordListState, accessToken, selectedGenre]);

        return (
            <>
                <div className='filterForm'>
                    <select
                        value={selectedGenre}
                        onChange={(e) => {setSelectedGenre(e.target.value)
                        ulElement.innerHTML = ''}
                            }
                    >
                        <option value="">All Genres</option>
                        {dropdownGenreOptions.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                    <button type='submit>'>Filter</button>

                </div>

                <ul id='recordDisplay'className='wrapper'>
                    
                </ul>
            </>
            
        )

}


export default RecordList