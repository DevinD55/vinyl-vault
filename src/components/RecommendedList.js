import Search from "./Search";
import RecordDisplay from "./RecordDisplay";

const RecommendedList = (props) => {
  const { accessToken } = props;

  return (
    <>
      <Search accessToken={accessToken} />
      <RecordDisplay accessToken={accessToken} listToShow={'recommendations'}/> 
    </>
  );
};

export default RecommendedList;
