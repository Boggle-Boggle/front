import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from 'pages/Auth';
import BookDetail from 'pages/BookDetail';
import Edit from 'pages/Edit';
import Home from 'pages/Home';
import Library from 'pages/Library';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';
import DeleteAccount from 'pages/MyPage/DeleteAccount';
import EditNickname from 'pages/MyPage/EditNickname';
import Term from 'pages/MyPage/Term';
import VersionInfo from 'pages/MyPage/VersionInfo';
import Note from 'pages/Note';
import PrivateRoute from 'pages/PrivateRoute';
import Record from 'pages/Record';
import Search from 'pages/Search';
import SignUp from 'pages/SignUp';

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
          { path: '/', element: <Home /> },
          { path: 'library', element: <Library /> },
          { path: 'myPage', element: <MyPage /> },
          { path: 'myPage/terms', element: <Term /> },
          { path: 'myPage/deleteAccount', element: <DeleteAccount /> },
          { path: 'myPage/VersionInfo', element: <VersionInfo /> },
          { path: 'search', element: <Search /> },
          { path: 'detail/:detailId', element: <BookDetail /> },
          { path: 'note/write', element: <Note /> },
          { path: 'record/:recordId', element: <Record /> },
          { path: 'edit/:recordId', element: <Edit /> },
        ],
      },
      { path: 'myPage/nickname', element: <EditNickname /> },
    ],
  },
  { path: 'signUp', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/oauth/redirect', element: <Auth /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
