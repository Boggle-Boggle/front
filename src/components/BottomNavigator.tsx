import { NavLink } from 'react-router-dom';

// import useKeyboardStatus from 'hooks/useKeyboardStatus';
import {
  IconBookSearch,
  IconBookSearchFilled,
  IconEllipsisHorizontal,
  IconHome,
  IconHomeFilled,
  IconLibrary,
  IconLibraryFilled,
} from './icons';

const Navigator = [
  {
    caption: '내 책장',
    url: '/',
    icon: <IconHome className="size-icon-navigation text-neutral-40" />,
    activeIcon: <IconHomeFilled className="size-icon-navigation text-primary" />,
  },
  {
    caption: '도서 검색',
    url: '/search',
    icon: <IconBookSearch className="size-icon-navigation text-neutral-40" />,
    activeIcon: <IconBookSearchFilled className="size-icon-navigation text-primary" />,
  },
  {
    caption: '나의 책',
    url: '/library',
    icon: <IconLibrary className="size-icon-navigation text-neutral-40" />,
    activeIcon: <IconLibraryFilled className="size-icon-navigation text-primary" />,
  },
  {
    caption: '설정',
    url: '/mypage',
    icon: <IconEllipsisHorizontal className="size-icon-navigation text-neutral-40" />,
    activeIcon: <IconEllipsisHorizontal className="size-icon-navigation text-primary" />,
  },
];

const BottomNavigator = () => {
  // const isKeyboardActive = useKeyboardStatus();

  // if (isKeyboardActive) return;

  return (
    <ul className="fixed bottom-0 z-navigator grid h-[4.125rem] w-full max-w-mobile grid-cols-4 items-center rounded-t-2xl border-t border-neutral-20 bg-neutral-0 text-xs">
      {Navigator.map(({ caption, url, icon, activeIcon }) => (
        <li className="size-full" key={caption}>
          <NavLink to={url} className="flex h-full flex-col items-center justify-center">
            {({ isActive }) => (
              <>
                {isActive ? activeIcon : icon}
                <p className={`${isActive ? 'text-primary' : 'text-neutral-40'}`}>{caption}</p>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default BottomNavigator;
