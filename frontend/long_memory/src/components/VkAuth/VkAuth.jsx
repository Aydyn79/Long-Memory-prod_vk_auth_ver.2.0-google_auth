import React, { Component } from 'react';
import VkAuth from 'react-vk-auth';
import useUserContext from "../../hooks/useUserContext";
import useStatusModalHook from "../../hooks/useStatusModalHook";
import {useLocation} from "react-router-dom";
import {get_headers} from '../../functions/api';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {set_token_to_storage} from "../../functions/tokenStorage";
import {parseResponse} from "../../functions/utils"
import {URL, PORT} from '../../functions/api_constants'

const USER_AUTHORIZATION_URL = `http://${URL}${PORT}/auth/vk/convert-token`;;


class AuthVK extends Component {
    
    handleVkResponse = (resp) => {
        console.warn(resp)
        const tokenResp = resp['session']
        
        const accessToken = tokenResp['sid'];
        const user_id = tokenResp['user']['id'];

        const headers = get_headers();
        const req_data = {
            grant_type:'convert_token',
            client_id: 'o0EkgqE0frl878aLLXaRbHw8ONEG25kwwHKe5rHp',
            backend:'vk-oauth2',
            token:accessToken
            }
        axios.post(USER_AUTHORIZATION_URL, req_data, {headers})
            .then(response => {
                console.log('userAuthorization response.data > ', response.data);
                const token = response.data.access_token;
                console.log(token)
                set_token_to_storage(token);
            }).catch((error) => {
            console.log(error);
        });
    }
    
    render() {
            return(
            <VkAuth apiId="51403117" callback={this.handleVkResponse}>Sign in with VK</VkAuth>
            )
        }
    }

export default AuthVK;