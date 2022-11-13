import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import {UserProvider} from "./components/UserProvider/UserProvider";
// import { SENTRY_DSN } from './functions/api_constants';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Sentry.init({
//   dsn: SENTRY_DSN,
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="140073813105-05evcieag1t9grl4o261n969t7oco9h3.apps.googleusercontent.com">
        <UserProvider>
            <App/>
        </UserProvider>
    </GoogleOAuthProvider>
);
