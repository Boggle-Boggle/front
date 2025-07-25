import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import Loading from 'pages/Loading';

import useDevice from 'hooks/useDevice';
import useModal from 'hooks/useModal';
import { getMyPageInfo, getTermsAgreement } from 'services/user';

import LogoutModal from './LogoutModal';
import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

const MyPage = () => {
  const { isIOS } = useDevice();
  const { isOpen, open, close, scrollPos } = useModal();
  const navigate = useNavigate();

  const { data: myPage, isLoading: isMyPageLoading } = useQuery({
    queryKey: ['myPage'],
    queryFn: () => getMyPageInfo(),
  });

  const { data: terms, isLoading: isTermsLoading } = useQuery({
    queryKey: ['termsAgreement'],
    queryFn: () => getTermsAgreement(),
  });

  if (isMyPageLoading || isTermsLoading) return <Loading />;

  return (
    myPage &&
    terms && (
      <div className={`bg-main px-5 ${isIOS ? 'py-[8.5rem]' : 'py-[6.5rem]'}`}>
        <section className="relative flex h-52 flex-col items-center rounded-lg bg-white pb-4 pt-20">
          <button
            className="flex items-center justify-center text-xl font-bold"
            type="button"
            aria-label=""
            onClick={() => navigate('nickname', { state: { nickname: myPage.nickname } })}
          >
            {myPage.nickname}
          </button>
          <ul className="flex w-full flex-grow justify-between pt-3">
            <li className="flex w-full flex-col items-center justify-center">
              <p className="my-1 text-xs opacity-50">총 읽은 책</p>
              <p className="font-bold">{myPage.totalReadingCnt}권</p>
            </li>
            <li className="flex w-full flex-col items-center justify-center border-l-2 border-r-2 border-main">
              <p className="my-1 text-xs opacity-50">이번달 읽은 책</p>
              <p className="font-bold">{myPage.monthlyReadingCnt}권</p>
            </li>
            <li className="flex w-full flex-col items-center justify-center">
              <p className="my-1 text-xs opacity-50">작성한 독서노트</p>
              <p className="font-bold">{myPage.totalNote}장</p>
            </li>
          </ul>
        </section>

        <Content>
          <ContentItem handleClick={() => navigate('QnA')}>자주묻는질문</ContentItem>
          <a href={import.meta.env.VITE_MYPAGE_FORM_URL} target="_blank" rel="noopener noreferrer">
            <ContentItem>문의하기</ContentItem>
          </a>
          <ContentItem handleClick={() => navigate('versionInfo')}>버전정보</ContentItem>
        </Content>
        <Content>
          {terms.terms.map((term) => (
            <ContentItem handleClick={() => navigate('terms', { state: { title: term.title, content: term.content } })}>
              {term.title}
            </ContentItem>
          ))}
        </Content>
        <Content>
          <ContentItem handleClick={open}>로그아웃</ContentItem>
          <ContentItem handleClick={() => navigate('deleteAccount')}>서비스 탈퇴</ContentItem>
        </Content>

        {isOpen && <LogoutModal isOpen={isOpen} close={close} scrollPos={scrollPos} />}
      </div>
    )
  );
};

export default MyPage;
