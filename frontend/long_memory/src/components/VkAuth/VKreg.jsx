import React from 'react';
import useUserContext from "../../hooks/useUserContext";
import useStatusModalHook from "../../hooks/useStatusModalHook";
import {useLocation} from "react-router-dom";
import {get_headers} from '../../functions/api';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {set_token_to_storage} from "../../functions/tokenStorage";
import {parseResponse} from "../../functions/utils"
import {URL, PORT} from '../../functions/api_constants'
import queryString from "query-string";
import classes from "../Header/Header.module.css";


const VK_AUTHORIZATION_URL = `http://oauth.vk.com/authorize?client_id=51403117&display=page&redirect_uri=http://localhost:3000/&scope=[friends,email]&response_type=token&v=5.131`
const USER_AUTHORIZATION_URL = `http://${URL}${PORT}/auth/vk/convert-token`;

const handleRedirect = () => {
        window.location.href = VK_AUTHORIZATION_URL 
        
    };


const VKreg = () => {
    let queryObj = queryString.parse(window.location.hash)
    console.log(queryObj)
    const {setToken} = useUserContext();
    const setStatus = useStatusModalHook();
    const navigate = useNavigate();
    if (queryObj['access_token']) {
        const accessToken = queryObj['access_token'];
        const userId = queryObj['user_id'];
        // const expiresIn = queryObj.get('expires_in');
        // const email = queryObj.get('email');
        const headers = get_headers();
        const data = {
            grant_type:'convert_token',
            client_id: 'o0EkgqE0frl878aLLXaRbHw8ONEG25kwwHKe5rHp',
            backend:'vk-oauth2',
            token:accessToken
            }
        console.log(data)
        axios.post(USER_AUTHORIZATION_URL, data, {headers})
            .then(response => {
                console.log('userAuthorization response.data > ', response.data);
                const token = response.data.access_token;
                console.log(token)
                set_token_to_storage(token);
                setToken(token);
                navigate("/notifications_list");
            }).catch((error) => {
            console.log(error);
            setStatus(parseResponse(error.response.data));
            });
    }
    return (
            <button className={classes.vk_button} onClick={handleRedirect}/>
        );
    };


export default VKreg;