import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DeviceProvider } from 'stores/useDeviceStore';

import Auth from 'pages/Auth';
import BookDetail from 'pages/BookDetail';
import Edit from 'pages/Edit';
import Home from 'pages/Home';
import WithBottomNavLayout from 'pages/Layout/WithBottomNavLayout';
import WithoutBottomNavLayout from 'pages/Layout/WithoutBottomNavLayout';
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
import Record from 'pages/Record';
import Search from 'pages/Search';
import SignUp from 'pages/SignUp';

import App from './App';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            element: <WithBottomNavLayout />,
            children: [
              { path: '/', element: <Home /> },
              { path: 'library', element: <Library /> },
              { path: 'myPage', element: <MyPage /> },
              { path: 'search', element: <Search /> },
              { path: 'detail/:detailId', element: <BookDetail /> },
              { path: 'record/:recordId', element: <Record /> },
              { path: 'edit/:recordId', element: <Edit /> },
            ],
          },
          {
            element: <WithoutBottomNavLayout />,
            children: [
              { path: 'note/write', element: <Note /> },
              { path: 'myPage/nickname', element: <EditNickname /> },
              { path: 'myPage/terms', element: <Term /> },
              { path: 'myPage/VersionInfo', element: <VersionInfo /> },
              { path: 'myPage/deleteAccount', element: <DeleteAccount /> },
              { path: 'myPage/QnA', element: <QnA /> },
            ],
          },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'signUp', element: <SignUp /> },
      { path: 'oauth', element: <Auth /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.MODE === 'production',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </DeviceProvider>
    ,
  </StrictMode>,
);
