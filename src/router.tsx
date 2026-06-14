import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

const Auth = lazy(() => import('pages/Auth'));
const BookDetail = lazy(() => import('pages/BookDetail'));
const BookDetailReviews = lazy(() => import('pages/BookDetail/Reviews'));
const RecordDetailPage = lazy(() => import('pages/RecordDetailPage'));
const Report = lazy(() => import('pages/Report'));
const WithBottomNavLayout = lazy(() => import('pages/Layout/WithBottomNavLayout'));
const WithoutBottomNavLayout = lazy(() => import('pages/Layout/WithoutBottomNavLayout'));
const PrivateRoute = lazy(() => import('pages/PrivateRoute'));

const Main = lazy(() => import('pages/Main'));
const MyPage = lazy(() => import('pages/MyPage'));
const Search = lazy(() => import('pages/Search'));
const MostRead = lazy(() => import('pages/Search/MostRead'));
const RealTimePopular = lazy(() => import('pages/Search/RealTimePopular'));
const Trending = lazy(() => import('pages/Search/Trending'));
const SearchResult = lazy(() => import('pages/SearchResult'));
const AddCustomBook = lazy(() => import('pages/AddCustomBook'));
const Library = lazy(() => import('pages/Library'));
const MyPageAccount = lazy(() => import('pages/MyPage/Account'));
const MyPageAppInfo = lazy(() => import('pages/MyPage/AppInfo'));
const MyPageAccountWithdraw = lazy(() => import('pages/MyPage/Account/Withdraw'));
const MyPageAccountWithdrawComplete = lazy(() => import('pages/MyPage/Account/WithdrawComplete'));
const MyPageContent = lazy(() => import('pages/MyPage/Content'));
const MyPageContentBlockedUsers = lazy(() => import('pages/MyPage/Content/BlockedUsers'));
const MyPageSupport = lazy(() => import('pages/MyPage/Support'));
const MyPageThemeFont = lazy(() => import('pages/MyPage/ThemeFont'));
const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const SignUpTermsDetail = lazy(() => import('pages/SignUp/TermsDetail'));
// const MyPage = lazy(() => import('pages/MyPage'));
// const Edit = lazy(() => import('pages/Edit'));
// const DeleteAccount = lazy(() => import('pages/MyPage/DeleteAccount'));
// const EditNickname = lazy(() => import('pages/MyPage/EditNickname'));
// const QnA = lazy(() => import('pages/MyPage/QnA'));
// const Term = lazy(() => import('pages/MyPage/Term'));
// const VersionInfo = lazy(() => import('pages/MyPage/VersionInfo'));
// const Note = lazy(() => import('pages/Note'));
// const Record = lazy(() => import('pages/Record'));
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
              { path: '/search/most-read', element: <MostRead /> },
              { path: '/search/realtime-popular', element: <RealTimePopular /> },
              { path: '/search/trending', element: <Trending /> },
              { path: '/library', element: <Library /> },
              { path: '/mypage', element: <MyPage /> },
              // { path: 'detail/:detailId', element: <BookDetail /> },
              // { path: 'record/:recordId', element: <Record /> },
              // { path: 'edit/:recordId', element: <Edit /> },
            ],
          },
          {
            element: <WithoutBottomNavLayout />,
            children: [
              { path: '/search/result', element: <SearchResult /> },
              { path: '/search/add', element: <AddCustomBook /> },
              { path: '/detail/:detailId', element: <BookDetail /> },
              { path: '/detail/:detailId/reviews', element: <BookDetailReviews /> },
              { path: '/records/:recordId', element: <RecordDetailPage /> },
              { path: '/mypage/account', element: <MyPageAccount /> },
              { path: '/mypage/app-info', element: <MyPageAppInfo /> },
              { path: '/mypage/account/withdraw', element: <MyPageAccountWithdraw /> },
              { path: '/mypage/account/withdraw-complete', element: <MyPageAccountWithdrawComplete /> },
              { path: '/mypage/content', element: <MyPageContent /> },
              { path: '/mypage/content/blocked-users', element: <MyPageContentBlockedUsers /> },
              { path: '/mypage/support', element: <MyPageSupport /> },
              { path: '/mypage/theme-font', element: <MyPageThemeFont /> },
              { path: '/report', element: <Report /> },
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
      { path: '/login', element: <Login /> },
      { path: '/auth', element: <Auth /> },
      {
        path: '/signup',
        element: <SignUp />,
        children: [{ path: 'terms/:termId', element: <SignUpTermsDetail /> }],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
