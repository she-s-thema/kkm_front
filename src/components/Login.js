import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Login() {
    return (
        <main className='login'>
            <div className='login-main'>
                <img className='no-text-logo' alt='no-text-logo' src='./imgs/logo.png'/>
                <form>
                    <input type="email" placeholder='이메일을 입력해주세요.'/>
                    <input type="password" placeholder='비밀번호를 입력해주세요.'/>
                    <button type="submit">로그인</button>
                </form>
                <NavLink className="go-to-signup" to="/signup">회원이 아니신가요?</NavLink>
            </div>
        </main>
    )
}