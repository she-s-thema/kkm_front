import React, { useEffect } from 'react'

export default function NaverLogin() {
    useEffect(() => {
        const naverScript = document.createElement("script")
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        document.head.appendChild(naverScript);
        naverScript.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientid:"ZfawtkWlMAcVCr5bLZcN",
                callbackUrl: "http://localhost:3000/",
                callbackHandle: true,
                isPopup: false,
                loginButton: {
                    color: "green", // 색상(white, green)
                    type: 3, // 버튼타입(1,2,3)
                    height: 60, // 배너 및 버튼 높이
                },
            })
        }
    })
    return (
        <div id="naverIdLogin"></div>
    )
}
