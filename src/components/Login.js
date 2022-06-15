import React from 'react'

export default function Login(props) {
    const REST_API_KEY = "9240bec26b639066d5ac5afdbaeb6bb0";
    const REDIRECT_URI =  "http://localhost:3000/auth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return (
        <section onClick={props.stopShowLogin} className='loging'>
            <main className='login'>
                <div className='login-main'>
                    <img className='no-text-logo' alt='no-text-logo' src='./imgs/logo-with-text.png'/>
                    <a className='login-by-kakao' href={KAKAO_AUTH_URL}>카카오 로그인</a>
                </div>
            </main>
        </section>
    )
}