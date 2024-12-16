import { FaRegUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { LuHome } from 'react-icons/lu';
import { PiBooksDuotone } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

// TODO : 선택된 탭 보더 처리
const BottomNavigator = () => {
  return (
    <ul className="fixed bottom-0 z-20 grid h-footer w-full max-w-screen-sm grid-cols-4 items-center rounded-t-xl bg-white shadow-navigator">
      <li className="m-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold' : 'flex flex-col items-center text-xs'
          }
        >
          <LuHome style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.35rem' }} />홈
        </NavLink>
      </li>
      <li className="m-auto">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-xs font-bold' : 'flex flex-col items-center text-xs'
          }
        >
          <FiSearch style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.35rem' }} />
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
          <PiBooksDuotone style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.35rem' }} />
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
          <FaRegUserCircle style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.35rem' }} />
          마이페이지
        </NavLink>
      </li>
    </ul>
  );
};

export default BottomNavigator;
