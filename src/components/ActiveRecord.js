import axios from "axios";
import { useState, useEffect } from "react";


const ActiveRecord = (props) => {

    const {accessToken, playAlbumId} = props;

    useEffect(() => {
        const fetchAlbumData = async () => {    
            try {
                const response = await axios.get('https://api.spotify.com/v1/albums/', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                params: {
                    ids: playAlbumId
                }
            });
            console.log(response.data);

            

            const openActiveWindow = () => {

                const activeRecordWindow = document.getElementById('activeRecord');
                activeRecordWindow.innerHTML='';
                const activeContainer = document.createElement('div');
                activeRecordWindow.appendChild(activeContainer);
                // activeTrackContainer.appendChild(activeTrack);

                const activeAlbum = response.data.albums[0];
                const activeAlbumName = activeAlbum.name;
                const activeAlbumTracks = Object.values(activeAlbum.tracks.items);
                const activeAlbumArtist = activeAlbum.artists[0].name;
                const activeAlbumArtistLink = activeAlbum.artists[0].external_urls.spotify;
                const activeAlbumCover = activeAlbum.images[1].url;
                const activeAlbumRating = activeAlbum.popularity;
                const activeAlbumReleaseDate = activeAlbum.release_date;
                const activeAlbumLink = activeAlbum.external_urls.spotify;

                console.log(activeAlbumTracks)

                activeContainer.innerHTML=`
                <div class='activeCoverLinkContainer'>
                    <img src=${activeAlbumCover} alt=${activeAlbumName+'cover art'} />
                </div>
                <div class='activeAlbumTextContainer'>
                    <h2>${activeAlbumName}</h2>
                    <h3>${activeAlbumArtist}</h3>
                    <ul id='activeTrackContainer'>

                    </ul>
                </div>
                `

                for (let key in activeAlbumTracks) {
                    if(key < activeAlbumTracks.length - 1) {
                        const activeTrackContainer = document.getElementById('activeTrackContainer');
                        const activeTrack = document.createElement('li');
                        activeTrack.innerHTML = `
                        <li>${activeAlbumTracks[key].name}</li>`

                        activeTrackContainer.appendChild(activeTrack);
                    }
                }

            }

            openActiveWindow();
        } catch (error) {
            console.error(error);
        }
        }

        fetchAlbumData();
    }, [ playAlbumId]);

    console.log(playAlbumId)


    return(
        <>
            <section className='wrapper' id='activeRecord'>

            </section>
        </>
        
    )
}

export default ActiveRecord;