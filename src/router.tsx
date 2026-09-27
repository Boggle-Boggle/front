import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

const Auth = lazy(() => import('pages/Auth'));
const BookDetail = lazy(() => import('pages/BookDetail'));
const RecordDetailPage = lazy(() => import('pages/Records/Detail'));
const RecordNew = lazy(() => import('pages/Records/New'));
const RecordNewCompleted = lazy(() => import('pages/Records/New/Completed'));
const NoteNew = lazy(() => import('pages/Notes/New'));
const NoteDetail = lazy(() => import('pages/Notes/Detail'));
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
const MyPageAbout = lazy(() => import('pages/MyPage/About'));
const MyPageAccountWithdraw = lazy(() => import('pages/MyPage/Account/Withdraw'));
const MyPageAccountWithdrawComplete = lazy(() => import('pages/MyPage/Account/WithdrawComplete'));
const MyPageContent = lazy(() => import('pages/MyPage/Content'));
const MyPageContentBlockedUsers = lazy(() => import('pages/MyPage/Content/BlockedUsers'));
// const MyPageContentMyReviews = lazy(() => import('pages/MyPage/Content/MyReviews'));
const MyPageSupport = lazy(() => import('pages/MyPage/Support'));
const MyPageAppearance = lazy(() => import('pages/MyPage/Appearance'));
const Terms = lazy(() => import('pages/Terms'));
const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const NotFound = lazy(() => import('pages/NotFound'));
const RouteErrorFallback = lazy(() => import('pages/RouteErrorFallback'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorFallback />,
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
            ],
          },
          {
            element: <WithoutBottomNavLayout />,
            children: [
              { path: '/search/result', element: <SearchResult /> },
              { path: '/books/:isbn13', element: <BookDetail /> },
              {
                path: '/records/new',
                children: [
                  { index: true, element: <RecordNew /> },
                  { path: 'custom-book', element: <AddCustomBook /> },
                  { path: 'completed', element: <RecordNewCompleted /> },
                ],
              },
              { path: '/records/:recordId', element: <RecordDetailPage /> },
              { path: '/mypage/account', element: <MyPageAccount /> },
              { path: '/mypage/about', element: <MyPageAbout /> },
              { path: '/mypage/account/withdraw', element: <MyPageAccountWithdraw /> },
              { path: '/mypage/account/withdraw-complete', element: <MyPageAccountWithdrawComplete /> },
              { path: '/mypage/content', element: <MyPageContent /> },
              { path: '/mypage/content/blocked-users', element: <MyPageContentBlockedUsers /> },
              // { path: '/mypage/content/reviews', element: <MyPageContentMyReviews /> },
              { path: '/mypage/support', element: <MyPageSupport /> },
              { path: '/mypage/appearance', element: <MyPageAppearance /> },
              { path: '/report', element: <Report /> },
            ],
          },
        ],
      },
      { path: '/login', element: <Login /> },
      { path: '/auth', element: <Auth /> },
      { path: '/notes/new', element: <NoteNew /> },
      { path: '/notes/:noteId/edit', element: <NoteNew /> },
      { path: '/notes/:noteId', element: <NoteDetail /> },
      { path: '/terms/:termId', element: <Terms /> },
      {
        path: '/signup',
        element: <SignUp />,
        children: [{ path: 'terms/:termId', element: <Terms /> }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
