import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Login() {
    return (
        <main className='login'>
            <div className='login-main'>
                <img className='no-text-logo' alt='no-text-logo' src='./imgs/logo.png'/>
                <NavLink to="/naver">네이버 로그인</NavLink>
                <NavLink className="go-to-signup" to="/signup">회원이 아니신가요?</NavLink>
            </div>
        </main>
    )
}