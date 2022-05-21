import React from 'react'
export default function SignUp() {
    return (
        <main className='login'>
            <div className='login-main'>
                <img className='no-text-logo' alt='no-text-logo' src='./imgs/logo.png'/>
                <form>
                    <input type="email" placeholder='이메일을 입력해주세요.'/>
                    <input type="text" placeholder='닉네임을 입력해주세요.'/>
                    <input type="password" placeholder='비밀번호를 입력해주세요.'/>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </main>
    )
}