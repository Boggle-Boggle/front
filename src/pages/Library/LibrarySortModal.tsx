import { SetStateAction } from 'react';

import FullScreenModal from 'components/FullScreenModal';
import CheckBox from 'pages/BookDetail/ReadingRecordForm/shared/CheckBox';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';
import Title from './shared/Title';

type LibrarySortModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

const LibrarySortModal = ({ onClose }: LibrarySortModalProps) => {
  const handleClose = () => {
    onClose(false);
  };
  const titles = ['최신순 보기', '오래된순 보기', '별점순 보기'];

  return (
    <FullScreenModal handleClose={handleClose}>
      <Title message="정렬" />
      <Content>
        {titles.map((title, idx) => (
          <ContentItem>
            <p>{title}</p>
            <CheckBox isChecked={idx === 0} />
          </ContentItem>
        ))}
      </Content>
    </FullScreenModal>
  );
};

export default LibrarySortModal;
