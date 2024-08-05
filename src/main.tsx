import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from 'pages/Login';

import App from './App';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'home', element: <div>홈</div> },
      { path: 'library', element: <div>서재</div> },
      { path: 'myPage', element: <div>마이페이지</div> },
    ],
  },
  { path: '/login', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
