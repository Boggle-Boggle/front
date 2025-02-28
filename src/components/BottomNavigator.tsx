import { NavLink } from 'react-router-dom';

import useDevice from 'hooks/useDevice';
import useKeyboardStatus from 'hooks/useKeyboardStatus';

import { NavigationBookSearch, NavigationHome, NavigationLibrary, NavigationMyPage } from 'assets/icons';

import Icon from './Icon';

const Links = [
  {
    icon: NavigationHome,
    href: '/',
    label: '홈',
  },
];

// TODO : 선택된 탭 보더 처리
// review : gnb global navigation bar
const BottomNavigator = () => {
  const { isIOS } = useDevice();
  const isKeyboardActive = useKeyboardStatus();

  if (isKeyboardActive) return null;

  // review: 데이터로 관리
  return (
    <ul
      className={`fixed bottom-0 z-20 grid w-full max-w-screen-sm grid-cols-4 items-center rounded-t-xl bg-white ${isIOS ? 'h-footerIOS pb-4' : 'h-footerAnd'} shadow-navigator`}
    >
      {Links.map(({ icon, href, label }) => (
        <li className="m-auto">
          <NavLink
            to={href}
            className={({ isActive }) => `flex flex-col items-center text-xs ${isActive && 'font-bold'}`}
          >
            <Icon Component={icon} />
            {label}
          </NavLink>
        </li>
      ))}
      {/* <li className="m-auto">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center text-xs ${isActive && 'font-bold'}`}>
          <Icon Component={NavigationHome} />홈
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold' : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={NavigationBookSearch} />
          검색
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold' : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={NavigationLibrary} />
          서재
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/myPage"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold' : 'flex flex-col items-center text-xs'
          }
        >
          <Icon Component={NavigationMyPage} />
          마이페이지
        </NavLink>
      </li> */}
    </ul>
  );
};

export default BottomNavigator;
