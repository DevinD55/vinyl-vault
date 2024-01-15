
import RecordDisplay from "./RecordDisplay.js";

const MyCollection = (props) => {
    
  const {accessToken} = props;
  

  return (
    <>

      {/* <ul id="recordDisplay" className="wrapper"></ul> */}
      <RecordDisplay accessToken={accessToken} listToShow={'recordCollection'}/> 
    </>
  );
};

export default MyCollection;
