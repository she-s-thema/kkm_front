import React, { useEffect } from 'react';
import queryString from "query-string";
import axios from 'axios';

export const Redirect = () => {

    const kakaoLogin =  async(code) => {
        const res =  await axios.post(`/user/kakaoLogin?code=${code}`)
        .then(res =>{
            if (res.data["id"] === 1) {
                // user_id, nickname, k_id, k_img_url, k_email
                console.log(res.data);
                // window.location.href = "/moreInfo";
            } else {
                console.log(res.data);
                // window.location.href = "/";
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