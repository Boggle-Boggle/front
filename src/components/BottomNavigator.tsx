import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import useDevice from 'hooks/useDevice';

import {
  NavigationBookSearch,
  NavigationBookSearchActive,
  NavigationHome,
  NavigationHomeActive,
  NavigationLibrary,
  NavigationLibraryActive,
  NavigationMyPage,
  NavigationMyPageActive,
} from 'assets/icons';

import Icon from './Icon';

// TODO : 선택된 탭 보더 처리
const BottomNavigator = () => {
  const { isIOS } = useDevice();
  const [activeTab, setActiveTab] = useState<string>('');
  const location = useLocation(); // 현재 위치를 추적

  useEffect(() => {
    setActiveTab(location.pathname); // 경로가 변경될 때마다 상태 업데이트
  }, [location]);

  return (
    <ul
      className={`fixed bottom-0 z-20 grid w-full max-w-screen-sm grid-cols-4 items-center rounded-t-xl bg-white ${isIOS ? 'h-footerIOS pb-4' : 'h-footerAnd'} shadow-navigator`}
    >
      <li className="m-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center text-xs font-bold text-[#be9685]'
              : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={activeTab === '/' ? NavigationHomeActive : NavigationHome} />홈
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold text-accent' : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={activeTab === '/search' ? NavigationBookSearchActive : NavigationBookSearch} />
          검색
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center text-xs font-bold text-[#E6B9A6]'
              : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={activeTab === '/library' ? NavigationLibraryActive : NavigationLibrary} />
          서재
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/myPage"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold text-accent' : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={activeTab === '/myPage' ? NavigationMyPageActive : NavigationMyPage} />
          마이페이지
        </NavLink>
      </li>
    </ul>
  );
};

export default BottomNavigator;
