import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import axios from "axios";
import {set_token_to_storage} from "../../functions/tokenStorage";
import {URL, PORT} from '../../functions/api_constants'



const USER_AUTHORIZATION_URL = `http://${URL}${PORT}/dj-rest-auth/google/`;

const Login = (setToken, navigate) => useGoogleLogin({
  onSuccess: codeResponse => {
    // console.log(codeResponse)
    const code = {"code":codeResponse.code}
    axios.post(USER_AUTHORIZATION_URL, code)
    .then(response => {
        // console.log('access_token > ', response);
        const token = response.data.key;
        // console.log(token)
        set_token_to_storage(token);
        setToken(token)
        navigate("/notifications_list");
    }).catch((error) => {
    console.log(error);
  })},
  flow: 'auth-code',
});


export default Login