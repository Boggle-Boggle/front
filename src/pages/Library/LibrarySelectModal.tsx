import { SetStateAction, useState } from 'react';

import CheckBox from 'components/CheckBox';
import FullScreenModal from 'components/FullScreenModal';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';
import Title from './shared/Title';

type LibrarySelectModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

const LibrarySelectModal = ({ onClose }: LibrarySelectModalProps) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleClose = () => {
    onClose(false);
  };

  const libraries = ['전체보기', '읽고 있는 책', '다 읽은 책', '읽는 중인 책'];
  const customLibraries = [
    '추천도서',
    'CS',
    '해리포터시리즈',
    '개발 관련 도서',
    '전공책',
    '애니메이션',
    '소설',
    '고전문학',
  ];
  return (
    <FullScreenModal handleClose={handleClose}>
      <Title message={isEdited ? '서재 편집' : '서재 선택'} />
      <section className="h-[calc(100%_-_3.75rem)] overflow-y-auto pb-5">
        <div className="mb-2 ml-4">기본 서재</div>
        <Content>
          {libraries.map((library) => (
            <ContentItem>
              {library}
              <CheckBox />
            </ContentItem>
          ))}
        </Content>
        <div className="m-4 mb-2">사용자 지정 서재</div>
        <Content>
          {customLibraries.map((library) => (
            <ContentItem>
              {library}
              <CheckBox />
            </ContentItem>
          ))}
        </Content>
      </section>
    </FullScreenModal>
  );
};

export default LibrarySelectModal;
