import React, {useState} from 'react'
export default function SignUp() {
    const [userData, setUserData] = useState({
        email:"",
        nickname:"",
        password:""
    })
    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setUserData(prev => {
            return {
                ...prev,
                [name]:[value]
            }
        }
        )
    }

    const checkData = (e) => {
        if(userData.email === "" || userData.nickname === "" || userData.password === "") {
            setErrMsg("정보가 입력되지 않았습니다.");
            e.preventDefault();
        }
        else if(userData.nickname[0].length > 10 || userData.nickname[0].length < 2) {
            setErrMsg("닉네임 설정 기준은 2 ~ 10자 사이입니다.")
            e.preventDefault();
        } else {
            setErrMsg("")
        }
    }

    return (
        <main className='login'>
            <div className='login-main'>
                <img className='no-text-logo' alt='no-text-logo' src='./imgs/logo.png'/>
                <form onSubmit={checkData}>
                    <input name="email" type="email" placeholder='이메일을 입력해주세요.' onChange={handleChange}/>
                    <input name="nickname" type="text" placeholder='닉네임을 입력해주세요.' onChange={handleChange}/>
                    <input name="password" type="password" placeholder='비밀번호를 입력해주세요.' onChange={handleChange}/>
                    <button type="submit">회원가입</button>
                </form>
                <span className='errMsg'>{errMsg}</span>
            </div>
        </main>
    )
}