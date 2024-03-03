import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref, push, child } from "@firebase/database";
import app from "../firebase";

const SearchResult = (props) => {
  const { searchResult } = props;
  const artistName = searchResult.artistName;
  const albumTitle = searchResult.albumTitle;
  const albumCover = searchResult.albumCover;
  const albumId = searchResult.albumId;

  const recommendAlbum = (e) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "recommendations");

    const newRecommendation = {
      id: e.target.id,
    };
    push(dbRef, newRecommendation);
    // dbRef.child("Victor").setValue(newRecommendation);
  };

  return (
    <li className="singleResultContainer">
      <div className="imageContainer">
        <img
          className="albumCover"
          src={`${albumCover.url}`}
          alt={`Album cover for ${albumTitle}`}
        />
      </div>
      <div className="infoContainer">
        <p className="albumTitle">{albumTitle}</p>
        <p className="artistName">{artistName}</p>
      </div>
      <span
        className="iconContainer"
        id={`${albumId}`}
        onClick={recommendAlbum}
      >
        <FontAwesomeIcon
          icon={faHeart}
          id={`${albumId}`}
          className="heartFilled"
          alt={`Press this to recommend ${albumTitle} to Devin`}
        />
      </span>
    </li>
  );
};

export default SearchResult;
