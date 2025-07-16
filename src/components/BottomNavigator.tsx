import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import useDevice from 'hooks/useDevice';
import useKeyboardStatus from 'hooks/useKeyboardStatus';

const BottomNavigator = () => {
  const { isIOS } = useDevice();
  const [activeTab, setActiveTab] = useState<string>('');
  const location = useLocation();

  const isKeyboardActive = useKeyboardStatus();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const getCurrentActive = () => {
    if (activeTab === '/') return 'home';

    if (activeTab.includes('search') || activeTab.includes('detail')) return 'search';

    if (activeTab.includes('library') || activeTab.includes('record')) return 'library';

    if (activeTab.includes('myPage')) return 'myPage';
  };

  if (isKeyboardActive) return;

  return (
    <ul
      className={`fixed bottom-0 z-20 grid w-full max-w-screen-sm grid-cols-4 items-center rounded-t-xl bg-white ${isIOS ? 'h-footerIOS pb-4' : 'h-footerAnd'} `}
    >
      <li className="m-auto">
        <NavLink
          to="/"
          className={`flex flex-col items-center text-xs ${getCurrentActive() === 'home' && 'font-bold text-accent'}`}
        />
      </li>
      <li className="m-auto">
        <NavLink
          to="/search"
          className={`flex flex-col items-center text-xs ${getCurrentActive() === 'search' && 'font-bold text-accent'}`}
        />
      </li>
      <li className="m-auto">
        <NavLink
          to="/library"
          className={`flex flex-col items-center text-xs ${getCurrentActive() === 'library' && 'font-bold text-accent'}`}
        />
      </li>
      <li className="m-auto">
        <NavLink
          to="/myPage"
          className={`flex flex-col items-center text-xs ${getCurrentActive() === 'myPage' && 'font-bold text-accent'}`}
        />
      </li>
    </ul>
  );
};

export default BottomNavigator;
