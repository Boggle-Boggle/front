import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

// const Auth = lazy(() => import('pages/Auth'));
// const BookDetail = lazy(() => import('pages/BookDetail'));
const Main = lazy(() => import('pages/Main'));
const WithBottomNavLayout = lazy(() => import('pages/Layout/WithBottomNavLayout'));
const WithoutBottomNavLayout = lazy(() => import('pages/Layout/WithoutBottomNavLayout'));
// const Library = lazy(() => import('pages/Library'));
// const Login = lazy(() => import('pages/Login'));
// const MyPage = lazy(() => import('pages/MyPage'));
// const Edit = lazy(() => import('pages/Edit'));
// const DeleteAccount = lazy(() => import('pages/MyPage/DeleteAccount'));
// const EditNickname = lazy(() => import('pages/MyPage/EditNickname'));
// const QnA = lazy(() => import('pages/MyPage/QnA'));
// const Term = lazy(() => import('pages/MyPage/Term'));
// const VersionInfo = lazy(() => import('pages/MyPage/VersionInfo'));
// const Note = lazy(() => import('pages/Note'));
const PrivateRoute = lazy(() => import('pages/PrivateRoute'));
// const Record = lazy(() => import('pages/Record'));
const Search = lazy(() => import('pages/Search'));
// const SignUp = lazy(() => import('pages/SignUp'));

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
              { path: '/', element: <Main /> },
              { path: '/search', element: <Search /> },
              // { path: 'library', element: <Library /> },
              // { path: 'myPage', element: <MyPage /> },
              // { path: 'detail/:detailId', element: <BookDetail /> },
              // { path: 'record/:recordId', element: <Record /> },
              // { path: 'edit/:recordId', element: <Edit /> },
            ],
          },
          {
            element: <WithoutBottomNavLayout />,
            children: [
              // 아래 레거시
              // { path: 'note/write', element: <Note /> },
              // { path: 'myPage/nickname', element: <EditNickname /> },
              // { path: 'myPage/terms', element: <Term /> },
              // { path: 'myPage/VersionInfo', element: <VersionInfo /> },
              // { path: 'myPage/deleteAccount', element: <DeleteAccount /> },
              // { path: 'myPage/QnA', element: <QnA /> },
            ],
          },
        ],
      },
      // 아래 레거시
      // { path: 'login', element: <Login /> },
      // { path: 'signUp', element: <SignUp /> },
      // { path: 'oauth', element: <Auth /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
