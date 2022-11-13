import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import axios from "axios";
import {set_token_to_storage} from "../../functions/tokenStorage";
import {parseResponse} from "../../functions/utils"
import {URL, PORT} from '../../functions/api_constants'
import useUserContext from "../../hooks/useUserContext";
import useStatusModalHook from "../../hooks/useStatusModalHook";
import {useNavigate} from "react-router-dom";


const USER_AUTHORIZATION_URL = `http://${URL}${PORT}/dj-rest-auth/google/`;
const data = {
  "access_token": "",
  "code": ""
  }
// const navigate = useNavigate();

const Login = () => useGoogleLogin({
  onSuccess: codeResponse => {
    console.log(codeResponse)
    const code = {"code":codeResponse.code}
    axios.post(USER_AUTHORIZATION_URL, code)
    .then(response => {
        console.log('access_token > ', response);
        const token = response.data.key;
        console.log(token)
        set_token_to_storage(token);
        // navigate("/notifications_list");
    }).catch((error) => {
    console.log(error);
  })},
  
  
  
  flow: 'auth-code',
});

// const CodePost = () => {
//   const {setToken} = useUserContext();
//   const setStatus = useStatusModalHook();
//   const navigate = useNavigate();
  
//   axios.post(USER_AUTHORIZATION_URL, data)
//     .then(response => {
//         console.log('userAuthorization response.data > ', response.data);
//         const token = response.data.access_token;
//         console.log(token)
//         set_token_to_storage(token);
//         setToken(token);
//         navigate("/notifications_list");
//     }).catch((error) => {
//     console.log(error);
//     setStatus(parseResponse(error.response.data));

// });}

export default Login