import React, { useEffect } from 'react';

const WelcomeScreen = (props) => {
    useEffect(() => {
        const logoButton = document.getElementById('logoButton');
        
        const spinImage = () => {
            logoButton.style.transform = 'rotate(360deg) scale(5)';
        }
        
        logoButton.addEventListener('click', function() {
            spinImage();
        });
    }, []); // Empty dependency array to ensure this runs only once after mount

    return (
        <div id="welcomeScreen">
            <div className="wrapper contentContainer">
                <h2>Welcome to VinylVault</h2>
                <p>Click the logo to open the vault</p>
                <button id="logoButton" onClick={() => setTimeout(props.hideWelcomeScreen, 500)} alt="click to see records in collection"></button>
            </div>
        </div>
    )
}

export default WelcomeScreen;

