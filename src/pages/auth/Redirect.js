import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import axios from 'axios';

export const Redirect = () => {
    const [ userData, setUserData ] = useState();

    const kakaoLogin =  async(code) => {
        const res =  await axios.post(`/user/kakaoLogin?code=${code}`)
        .then(res =>{
            setUserData(res.data);
            if(res.data["status"] = "Guest") {
                window.location.href = "/login/moreInfo";
            } else {
                window.location.href = "/"
            }
        });
    }

    useEffect(() => {
        const sp = window.location.search;
        const query = queryString.parse(sp); // params 값을 key-value로 가져옴

        kakaoLogin(query.code);
    })
    return <></>
}