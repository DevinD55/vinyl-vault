import { useState } from "react";
import axios from "axios";

const RecordPlayer = (props) => {

    const {accessToken, playAlbumId} = props;

    const [currentlyPlaying, setCurrentlyPlaying] = useState('');


    return(
        <section className='recordPlayer'>
            <h2>Now Playing:</h2>
            {/* onClick app should set playState to the first track in the album list
             */}

        </section>
    )
}

export default RecordPlayer;