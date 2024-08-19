import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from 'pages/Auth';
import Login from 'pages/Login';
import PrivateRoute from 'pages/PrivateRoute';

import App from './App';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/oauth/redirect', element: <Auth /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
