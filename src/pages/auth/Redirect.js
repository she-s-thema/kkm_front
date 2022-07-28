import React, { useEffect } from 'react';
import queryString from "query-string";
import axios from 'axios';

export const Redirect = () => {
    useEffect(() => {
        const sp = window.location.search;
        const query = queryString.parse(sp); // params 값을 key-value로 가져옴

        axios.post(`/kakaoLogin?code=${query.code}`)
        .then(res => console.log(res));
    })
    return <></>
}