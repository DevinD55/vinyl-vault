import { getDatabase, ref, get, child } from "@firebase/database";
import axios from "axios";
import { useState, useEffect } from "react";
import app from "../firebase";

const RecordDisplay = (props) => {
    const { accessToken, hideActiveAlbum, listToShow } = props;


    // Variable to hold db details:
    const database = getDatabase(app);
    // Variable that references our db:
    const dbRef = ref(database);
    const [recordListState, setRecordListState] = useState([]);
  
    // Variable to save the currently selected genre or artist
    const [selectedGenre, setSelectedGenre] = useState("");
  
    const [dropdownGenreOptions, setDropdownGenreOptions] = useState([]);
  
    const scannedGenres = [];
  
    const ulElement = document.getElementById("recordDisplay");
  
    // Scans the firebase database to check if there are records available.
    const fetchData = async () => {
      try {
        const snapshot = await get(child(dbRef, `${listToShow}`));
        if (snapshot.exists()) {
          setRecordListState(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [dbRef]);
  
    useEffect(() => {
      const fetchAlbumData = async () => {
        for (let key in recordListState) {
        const recordId = recordListState[key].id;
  
          try {
            const response = await axios.get(
              "https://api.spotify.com/v1/albums/",
              {
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
                params: {
                  ids: recordId,
                },
              }
            );
            const album = response.data.albums[0];
            const albumName = album.name;
            const shortenString = () => {
              if (albumName.length > 15) {
                return albumName.slice(0, 20) + "...";
              }
            };
            const albumRelease = album.release_date;
  
            const shortAlbumName = shortenString(albumName);
            const artistName = album.artists[0].name;
            const albumCover = album.images[1].url;
            const releaseYear = albumRelease.slice(0, 4);
            const openLink = album.external_urls.spotify;
            const albumId = album.id;
            const albumGenre = recordListState[key].genre;
  
            const liElement = document.createElement("li");
            liElement.innerHTML = `
          <div class='coverLinkContainer'>
              <img class='albumCover' src='${albumCover}'/>
          </div>
          <div class='recordTextContainer'>
              <h2 class='albumName'>${shortAlbumName}</h2>
              <h3 class='artistName'>${artistName}</h3>
              <h3 class='releaseDate'>${releaseYear}</h3>
              <h3 class='idText'>${albumId}</h3>
          </div>
          `;
  
            if (scannedGenres.includes(albumGenre)) {
            } else {
              scannedGenres.push(albumGenre);
              setDropdownGenreOptions([...scannedGenres]);
            }
  
            if (selectedGenre.includes(albumGenre)) {
              liElement.className = "singleRecord";
              ulElement.appendChild(liElement);
            } else if (selectedGenre === "") {
              liElement.className = "singleRecord";
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
    <div className="filterForm">
        <select
          className="genreSelector"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            ulElement.innerHTML = "";
          }}
        >
          <option className="genreOption"value="">All Genres</option>
          {dropdownGenreOptions.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

          <ul id="recordDisplay" className="wrapper"></ul>;

    </>

  )
  
};


export default RecordDisplay;