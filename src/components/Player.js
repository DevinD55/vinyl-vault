import SpotifyPlayer from "react-spotify-web-playback";

const Player = (props) => {

    const {accessToken, trackUri} = props;

    if (!accessToken) {
        return null
    }

    return(
        <SpotifyPlayer 
            token={accessToken}
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
        />
    )
}
    export default Player;