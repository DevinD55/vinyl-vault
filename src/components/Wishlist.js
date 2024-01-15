import RecordDisplay from "./RecordDisplay";

const Wishlist = (props) => {
    
  const { accessToken, hideActiveAlbum, listToShow } = props;

  return (
    <RecordDisplay accessToken={accessToken} listToShow={'recordWishlist'}/> 

  );
};

export default Wishlist;
