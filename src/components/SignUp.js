import React from 'react'

export default function SignUp() {
    return (
        <div className='signup'>
            <div className='signup-content'>
                <div className='signup-form'>
                    <img className='logo-with-text' src='./logo-with-text.png' alt='logo' />
                    <form>
                        <div className='input-box'>
                            <input className='signup-input' type="text" placeholder='닉네임을 입력해주세요' />
                            <button type='button'>중복 확인</button>
                        </div>
                        <div className='input-box'>
                            <input className='signup-input' type="email" placeholder='이메일을 입력해주세요' />
                            <button type='button'>중복 확인</button>
                        </div>
                        <div className='input-box'>
                            <input className='signup-pwd max-width' type="password" placeholder='비밀번호를 입력해주세요.'/>
                        </div>
                        <div> 
                            <input type="checkbox" />
                            <span>개인정보 수집 동의</span>
                        </div>
                        <input type="button"/>
                    </form>
                </div>
            </div>
        </div>
    )
}