import { useState, useEffect } from "react"
import axios from "axios";
import SingleRecord from "./SingleRecord";
import { getDatabase, ref, onValue, child, get} from 'firebase/database';
import app from '../firebase.js'

const RecordList = (props) => {

    const {accessToken} = props;

    // Variable to hold db details:
    const database = getDatabase(app);
    // Variable that references our db:
    const dbRef = ref(database);
    const [recordListState, setRecordListState] = useState([]);


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
        });
    }, [])

    console.log(recordListState)

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
        })
        .then(data => console.log(data.data.albums[0].name))
    }



        return (
            <>
            <ul className="recordDisplay">
                {/* {recordListState.map(singleRecord)
                } */}
            </ul>
            
            
            </>
            
        )

}


export default RecordList