import React from 'react';
import Destructuring from '../assets/img/destructuring.svg';
import WebpageLogo from '../assets/img/WebPage_logo.svg';
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div>
            <div className='main-parent'>
                <div style={{paddingRight: "1rem"}}><img src={Destructuring} alt="destructuring"/></div>
                <div><img src={WebpageLogo} alt="webpage-logo" /></div>
            </div>

            <div className='custome-center-align'>
                <button className='next-btn-nav custome-w'>
                    <Link className='join-txt' to='/form'>Join Us</Link>
                </button>
            </div> 
        </div>
    )
}

