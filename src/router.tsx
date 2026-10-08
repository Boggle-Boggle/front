import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import AddCustomBookPage from './pages/AddCustomBook';
import Auth from './pages/Auth';
import BookDetailPage from './pages/BookDetail';
import WithBottomNavLayout from './pages/Layout/WithBottomNavLayout';
import WithoutBottomNavLayout from './pages/Layout/WithoutBottomNavLayout';
import Library from './pages/Library';
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyPageAbout from './pages/MyPage/About';
import MyPageAccount from './pages/MyPage/Account';
import MyPageAccountWithdraw from './pages/MyPage/Account/Withdraw';
import MyPageAccountWithdrawComplete from './pages/MyPage/Account/WithdrawComplete';
import MyPageAppearance from './pages/MyPage/Appearance';
import MyPageContent from './pages/MyPage/Content';
import MyPageContentBlockedUsers from './pages/MyPage/Content/BlockedUsers';
import MyPageSupport from './pages/MyPage/Support';
import NotFound from './pages/NotFound';
import NoteDetail from './pages/Notes/Detail';
import RecordNotes from './pages/Notes/List';
import NoteNew from './pages/Notes/New';
import PrivateRoute from './pages/PrivateRoute';
import ReadingRecordDetailPage from './pages/Records/Detail';
import RecordNew from './pages/Records/New';
import RecordNewCompleted from './pages/Records/New/Completed';
import ReportPage from './pages/Report';
import RouteErrorFallback from './pages/RouteErrorFallback';
import Search from './pages/Search';
import MostRead from './pages/Search/MostRead';
import RealTimePopular from './pages/Search/RealTimePopular';
import Trending from './pages/Search/Trending';
import SearchResult from './pages/SearchResult';
import SignUp from './pages/SignUp';
import Terms from './pages/Terms';

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
              { path: '/books/:isbn13', element: <BookDetailPage /> },
              {
                path: '/records/new',
                children: [
                  { index: true, element: <RecordNew /> },
                  { path: 'custom-book', element: <AddCustomBookPage /> },
                  { path: 'completed', element: <RecordNewCompleted /> },
                ],
              },
              { path: '/records/:recordId', element: <ReadingRecordDetailPage /> },
              { path: '/records/:recordId/notes', element: <RecordNotes /> },
              { path: '/mypage/account', element: <MyPageAccount /> },
              { path: '/mypage/about', element: <MyPageAbout /> },
              { path: '/mypage/account/withdraw', element: <MyPageAccountWithdraw /> },
              { path: '/mypage/account/withdraw-complete', element: <MyPageAccountWithdrawComplete /> },
              { path: '/mypage/content', element: <MyPageContent /> },
              { path: '/mypage/content/blocked-users', element: <MyPageContentBlockedUsers /> },
              // { path: '/mypage/content/reviews', element: <MyPageContentMyReviews /> },
              { path: '/mypage/support', element: <MyPageSupport /> },
              { path: '/mypage/appearance', element: <MyPageAppearance /> },
              { path: '/report', element: <ReportPage /> },
              { path: '/notes/new', element: <NoteNew /> },
              { path: '/notes/:noteId/edit', element: <NoteNew /> },
              { path: '/notes/:noteId', element: <NoteDetail /> },
            ],
          },
        ],
      },
      { path: '/login', element: <Login /> },
      { path: '/auth', element: <Auth /> },
      // TODO: /terms/:termId 경로 일원화
      { path: '/terms/:termId', element: <Terms /> },
      { path: '/signup', element: <SignUp />, children: [{ path: 'terms/:termId', element: <Terms /> }] },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
