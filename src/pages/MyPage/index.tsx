import { BiBook, BiBookOpen, BiCool } from 'react-icons/bi';
import { RiPencilLine } from 'react-icons/ri';
// import useAuthStore from 'stores/useAuthStore';

// import LogoutBtn from 'pages/Login/LogoutBtn';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

const MyPage = () => {
  // const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-main px-5 py-[6.5rem]">
      <section className="relative flex h-52 flex-col items-center rounded-lg bg-white pb-4 pt-20">
        <img
          className="absolute -top-[4.5rem] left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-white"
          src="https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9"
          alt=""
        />

        <button className="flex items-center justify-center text-xl" type="button">
          닉네임 <RiPencilLine style={{ width: '20px', height: '20px', opacity: '50%', paddingLeft: '2px' }} />
        </button>
        <ul className="flex w-full flex-grow justify-between pt-3">
          <li className="flex w-full flex-col items-center justify-center">
            <BiBook style={{ width: '24px', height: '24px', opacity: '50%' }} />
            <p className="my-1 text-xs opacity-50">총 읽은 권수</p>
            <p className="font-bold">27권</p>
          </li>
          <li className="flex w-full flex-col items-center justify-center border-l-2 border-r-2 border-main">
            <BiCool style={{ width: '24px', height: '24px', opacity: '50%' }} />
            <p className="my-1 text-xs opacity-50">이번달 독서량</p>
            <p className="font-bold">3권</p>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <BiBookOpen style={{ width: '24px', height: '24px', opacity: '50%' }} />
            <p className="my-1 text-xs opacity-50">작성한 독서노트</p>
            <p className="font-bold">2798장</p>
          </li>
        </ul>
      </section>

      <Content>
        <ContentItem>자주묻는질문</ContentItem>
        <ContentItem>문의하기</ContentItem>
        <ContentItem>버전정보</ContentItem>
        <ContentItem>개발자 소개</ContentItem>
        <ContentItem>평점</ContentItem>
      </Content>
      <Content>
        <ContentItem>서비스 이용 약관</ContentItem>
        <ContentItem>개인정보 처리 방침</ContentItem>
        <ContentItem>오픈소스 라이선스</ContentItem>
      </Content>
      <Content>
        <ContentItem>로그아웃</ContentItem>
        <ContentItem>서비스 탈퇴</ContentItem>
      </Content>

      {/* {isAuthenticated && <LogoutBtn />} */}
    </div>
  );
};

export default MyPage;
