import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DeviceProvider } from 'stores/useDeviceStore';

import Auth from 'pages/Auth';
import BookDetail from 'pages/BookDetail';
import Edit from 'pages/Edit';
import Home from 'pages/Home';
import Library from 'pages/Library';
import Loading from 'pages/Loading';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';
import DeleteAccount from 'pages/MyPage/DeleteAccount';
import EditNickname from 'pages/MyPage/EditNickname';
import QnA from 'pages/MyPage/QnA';
import Term from 'pages/MyPage/Term';
import VersionInfo from 'pages/MyPage/VersionInfo';
import Note from 'pages/Note';
import PrivateRoute from 'pages/PrivateRoute';
import Christmas2025 from 'pages/Promotion/Christmas2025';
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
          { path: '/promotion/christmas2025', element: <Christmas2025 /> },
          { path: 'library', element: <Library /> },
          { path: 'myPage', element: <MyPage /> },
          { path: 'search', element: <Search /> },
          { path: 'detail/:detailId', element: <BookDetail /> },
          { path: 'record/:recordId', element: <Record /> },
          { path: 'edit/:recordId', element: <Edit /> },
        ],
      },
      { path: 'note/write', element: <Note /> },
      { path: 'myPage/nickname', element: <EditNickname /> },
      { path: 'myPage/terms', element: <Term /> },
      { path: 'myPage/VersionInfo', element: <VersionInfo /> },
      { path: 'myPage/deleteAccount', element: <DeleteAccount /> },
      { path: 'myPage/QnA', element: <QnA /> },
    ],
  },
  { path: 'signUp', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/oauth/redirect', element: <Auth /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DeviceProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </DeviceProvider>
  </React.StrictMode>,
);
