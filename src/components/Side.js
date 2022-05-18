import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Side() {
    return (
        <aside>
            <img src='./logo.png' alt='logo'/>
            <div className='links'>
                <NavLink className='link home-link' to="/">홈</NavLink>
                <NavLink className='link login-link' to="signup">로그인</NavLink>
                <NavLink className='link' to="*">고객 문의</NavLink>
            </div>
        </aside>
    )
}