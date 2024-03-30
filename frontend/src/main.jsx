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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
