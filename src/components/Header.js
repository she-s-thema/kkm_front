import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className='header'>
            <div className='header-content'>
                <img className='text-logo-img' src='./imgs/text-logo.png' alt='logo' />
                <div className='links'>
                    <NavLink className="header-link" to="/">홈</NavLink>
                    <NavLink className="header-link" to="/chat">채팅</NavLink>
                    <NavLink className="header-link" to="/mypage">마이페이지</NavLink>
                    <NavLink className="header-link" to="/login">로그인</NavLink>
                </div>
            </div>
        </header>
    )
}