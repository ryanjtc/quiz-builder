import React from 'react';
import './NavBar.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="NavBar">
            <ul>
                <NavLink to={'/'}>
                    <li>Home</li>
                </NavLink>

                <NavLink to={'/create'}>
                    <li>Create</li>
                </NavLink>

                <NavLink to={'/play'}>
                    <li>Play</li>
                </NavLink>

                <NavLink to={'/help'}>
                    <li>Help</li>
                </NavLink>

            </ul>
        </nav>
    );
};

export default NavBar;
