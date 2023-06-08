const Header = () => {

    return(
        <header className="header">
            <div className="wrapper">
                <figure className="logo">
                <span className="sr-only">
                    Vinyl Vault Logo
                </span>
                </figure>
                <nav className="navBar">
                    <ul>
                        <a>Collection</a>
                        <a>Wishlist</a>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header