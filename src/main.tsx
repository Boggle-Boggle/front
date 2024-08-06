import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Library from 'pages/Library';
import Login from 'pages/Login';
import Search from 'pages/Search';

import App from './App';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <div>홈</div> },
      { path: 'home', element: <div>홈</div> },
      { path: 'library', element: <Library /> },
      { path: 'myPage', element: <div>마이페이지</div> },
      { path: 'search', element: <Search /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
