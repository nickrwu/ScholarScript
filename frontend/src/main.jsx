import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'
import Root from '../routes/root'
import Profile from '../routes/profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain='dev-8e6na36mr8mn3qpc.us.auth0.com'
    clientId='jvRNCFnCZDgwNUndWc2njTy4gr30QJJe'
    authorizationParams={{ redirect_uri: window.location.origin }}>
  <App />
</Auth0Provider>
);