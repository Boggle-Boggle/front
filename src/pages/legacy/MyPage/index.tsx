import { useNavigate } from 'react-router-dom';

import useDevice from 'hooks/useDevice';
import useModal from 'hooks/useModal';

import LogoutModal from './LogoutModal';
import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

const MyPage = () => {
  const { isIOS } = useDevice();
  const { isOpen, open, close, scrollPos } = useModal();
  const navigate = useNavigate();

  return (
    <div className={`bg-main px-5 ${isIOS ? 'py-[8.5rem]' : 'py-[6.5rem]'}`}>
      <Content>
        <ContentItem handleClick={() => navigate('QnA')}>자주묻는질문</ContentItem>
        <a href={import.meta.env.VITE_MYPAGE_FORM_URL} target="_blank" rel="noopener noreferrer">
          <ContentItem>문의하기</ContentItem>
        </a>
        <ContentItem handleClick={() => navigate('versionInfo')}>버전정보</ContentItem>
      </Content>

      <Content>
        <ContentItem handleClick={open}>로그아웃</ContentItem>
        <ContentItem handleClick={() => navigate('deleteAccount')}>서비스 탈퇴</ContentItem>
      </Content>

      {isOpen && <LogoutModal isOpen={isOpen} close={close} scrollPos={scrollPos} />}
    </div>
  );
};

export default MyPage;
