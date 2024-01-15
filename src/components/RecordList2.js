import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyCollection from './MyCollection';
import Wishlist from './Wishlist';
import RecommendedList from './RecommendedList';

const RecordList2 = (props) => {

  const {accessToken} = props;


    return (
        <div className="recordListContainer">
        <Routes>
          <Route path="/" element={<MyCollection accessToken={accessToken}/>} />
          <Route path="/wishlist" element={<Wishlist accessToken={accessToken}/>} />
          <Route path="/recommendations" element={<RecommendedList accessToken={accessToken}/>} />
        </Routes>

        </div>
    )
}

export default RecordList2;