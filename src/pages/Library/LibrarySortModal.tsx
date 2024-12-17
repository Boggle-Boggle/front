import { SetStateAction } from 'react';

import CheckBox from 'components/CheckBox';
import FullScreenModal from 'components/FullScreenModal';

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
        {titles.map((title) => (
          <ContentItem>
            <p className="opacity-70">{title}</p>
            <CheckBox />
          </ContentItem>
        ))}
      </Content>
    </FullScreenModal>
  );
};

export default LibrarySortModal;