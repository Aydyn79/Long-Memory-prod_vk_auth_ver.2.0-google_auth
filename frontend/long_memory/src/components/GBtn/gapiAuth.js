import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { client } from '../client';
import jwt_decode from "jwt-decode";

const GoogleLoginPage = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
   //console.log(response);
    const userObject = jwt_decode(response.credential);
    //console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });

  }

  return (
    <div className="">
          <div className="flex justify-start items-center flex-col h-screen">
            <GoogleOAuthProvider 
                clientId="140073813105-05evcieag1t9grl4o261n969t7oco9h3.apps.googleusercontent.com"
                >
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
            </GoogleOAuthProvider>
          </div>
    </div>
  )
}

export default GoogleLoginPage