import React from 'react';
import Logo from '../assets/img/ddroidd_logo.svg';
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    
    const showButton = (location.pathname === "/") ? (
        <div className='next-to-form-nav'>
            <button className='next-btn-nav custome-w'>
                <Link className='join-txt' to='/form'>Join Us</Link>
            </button>
        </div> 
    ) : null;

    return (
        <div>
            <div className='header'>
                <img className='logo' src={Logo} alt="logo" />
                <h1>Winter Internship</h1>
                {showButton}
            </div>
        </div>
    )
}
