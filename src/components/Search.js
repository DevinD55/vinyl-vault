import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import SearchResult from "./SearchResult";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a84ca340e64cfdae61428e61746205",
});

const Search = (props) => {
  const { accessToken } = props;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);

    if (!accessToken) return;

    spotifyApi.searchAlbums(search).then((res) => {
      if (!res) return;

      const filteredAlbums = res.body.albums.items.filter(
        (album) =>
          !(album.album_type === "single" || album.album_type === "compilation")
      );
      const mappedResults = filteredAlbums.map((album) => {
        const albumId = album.id;
        const artistName = album.artists[0].name;
        const albumTitle = album.name;
        const albumCover = album.images[2];

        return {
          albumId,
          artistName,
          albumTitle,
          albumCover,
        };
      });

      setSearchResults(mappedResults);
    });
  }, [search, accessToken]);

  return (
    <>
      <Container className="searchContainer">
        <Form.Control
          type="search"
          placeholder="Find an album"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul id="resultList">
          {searchResults.map((result, index) => (
            <SearchResult key={index} searchResult={result} accessToken={accessToken}/>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Search;
