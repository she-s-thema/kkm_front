import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Header(props) {
    return (
        <header className='header'>
            <div className='header-content'>
                <img className='text-logo-img' src='./imgs/text-logo.png' alt='logo' />
                <div className='links'>
                    <NavLink className="header-link" to="/">HOME</NavLink>
                    <NavLink className="header-link" to="/chat">CHAT</NavLink>
                    <NavLink className="header-link" to="/mypage">MYPAGE</NavLink>
                    <NavLink className="header-link" onClick={props.showLogin} to="/login">LOGIN</NavLink>
                </div>
            </div>
        </header>
    )
}