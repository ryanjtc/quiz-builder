import React from 'react';
import './Header.css';
import NavBar from "../NavBar/NavBar";

const Header = () => {
    return (
        <>
            <header className={"App-header"}>
                <div className={"title"}>Quiz Builder</div>
            </header>
            <NavBar />
        </>
    );
};

export default Header;