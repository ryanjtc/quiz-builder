import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import './Help.css';

const Help = () => {
    return (
        <div className="help-container">
            <h1 className="help-heading">Help Page</h1>
            <ol className="help-navigation">
                <li><NavLink to={''}>Overview</NavLink></li>
                <li><NavLink to={'helpCreate'}>Creating a quiz</NavLink></li>
                <li><NavLink to={'helpPlay'}>Playing a quiz</NavLink></li>
                <Outlet/>
            </ol>
        </div>
    );
};

export default Help;
