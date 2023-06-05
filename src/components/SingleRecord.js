import axios from "axios"
import { useEffect } from "react"

const SingleRecord = (props) => {

    const {recordCollection, accessToken} = props;

// iterate through RecordList state
// for each item make an axios call and return the album data (Album Name, Artist Name, Release Year, Ect)
// Append returned data to empty UL 

console.log(recordCollection)


    return(
        <p> Look it's a sinlge Record!!!!! </p>
    )
}

export default SingleRecord