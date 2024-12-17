import { SetStateAction, useState } from 'react';

import CheckBox from 'components/CheckBox';
import FullScreenModal from 'components/FullScreenModal';
import Header from 'components/Header';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

type LibraryEditedModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
  handleOpenSelect: React.Dispatch<SetStateAction<boolean>>;
};

const LibraryEditedModal = ({ onClose, handleOpenSelect }: LibraryEditedModalProps) => {
  const [values, setValues] = useState<string>('');
  const handleClose = () => {
    handleOpenSelect(true);
    onClose(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

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
    <FullScreenModal>
      <Header
        title={{ text: '서재 편집' }}
        rightBtn={{
          icon: (
            <button onClick={handleClose} type="submit">
              완료
            </button>
          ),
          handleRightBtnClick: () => {},
        }}
      />
      <form className="flex h-10 w-full items-center justify-between px-4">
        <input
          placeholder="추가하고 싶은 서재명을 입력하세요"
          value={values}
          onChange={(e) => handleChange(e)}
          className="h-10 w-[92%] rounded-md p-2 pr-2 focus:outline-none"
        />
        <CheckBox type="plus" isChecked={false} />
      </form>
      <div className="m-4 mb-2">사용자 지정 서재</div>
      <div className="h-[calc(100%_-_9.2rem)] overflow-y-auto pb-5">
        <Content>
          {customLibraries.map((library) => (
            <ContentItem>
              {library}
              <CheckBox />
            </ContentItem>
          ))}
        </Content>
      </div>
    </FullScreenModal>
  );
};

export default LibraryEditedModal;
