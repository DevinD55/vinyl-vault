import { Link } from "react-router-dom";

const Header2 = () => {
  return (
    <header className="header">
      <div className="headerWrapper">
        <Link to="/" className="logoLink">
          <h1 className="logoText">VinylVault.</h1>
        </Link>
        <div className="buttonContainer">
          <Link to="/" className="pageLink">
            <button className="pageButton">Collection</button>
          </Link>
          <Link to="/wishlist" className="pageLink">
            <button className="pageButton">Wishlist</button>
          </Link>
          {/* <Link to="/recommendations" className="pageLink">
                        <button className="pageButton">
                            Recommendations
                        </button>
                    </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header2;
