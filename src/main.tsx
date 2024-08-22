import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from 'pages/Auth';
import Library from 'pages/Library';
import Login from 'pages/Login';
import PrivateRoute from 'pages/PrivateRoute';
import Search from 'pages/Search';
import SignUpFlow from 'pages/SignUpFlow';

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
        children: [
          { path: '/', element: <div>홈</div> },
          { path: 'home', element: <div>홈</div> },
          { path: 'library', element: <Library /> },
          { path: 'myPage', element: <div>마이페이지</div> },
          { path: 'search', element: <Search /> },
        ],
      },
    ],
  },
  { path: 'signUp', element: <SignUpFlow /> },
  { path: '/login', element: <Login /> },
  { path: '/oauth/redirect', element: <Auth /> },
]);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
