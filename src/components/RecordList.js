import { useState, useEffect } from "react"
import axios from "axios";
import SingleRecord from "./SingleRecord";

const RecordList = (props) => {

    axios('https://api.spotify.com/v1/search?q=ugly&type=album', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + props.accessToken
        }
    })
    .then(data => console.log(data))

        return (
            <>
            <p> record List!!!</p>
            <SingleRecord/>
            </>
            
        )

}

export default RecordList