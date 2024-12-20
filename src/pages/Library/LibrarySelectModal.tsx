import { SetStateAction } from 'react';

import CheckBox from 'components/CheckBox';
import FullScreenModal from 'components/FullScreenModal';
import Header from 'components/Header';

import { DefaultLibraryStatus, DefaultLibraryTitle, Library } from 'types/library';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

type LibrarySelectModalProps = {
  libraries: Library[];
  onClose: React.Dispatch<SetStateAction<boolean>>;
  handleEdit: React.Dispatch<SetStateAction<boolean>>;
  selectedLibrary: DefaultLibraryStatus | 'all' | number;
  setSelectedLibrary: React.Dispatch<SetStateAction<DefaultLibraryStatus | 'all' | number>>;
};

const LibrarySelectModal = ({
  libraries,
  onClose,
  handleEdit,
  selectedLibrary,
  setSelectedLibrary,
}: LibrarySelectModalProps) => {
  const handleOpenEdit = () => {
    handleEdit(true);
    onClose(false);
  };

  const handleClick = (selected: string | number) => {
    if (typeof selected === 'number') {
      setSelectedLibrary(selected);
      return;
    }

    if (['all', 'reading', 'pending', 'completed'].includes(selected))
      setSelectedLibrary(selected as DefaultLibraryStatus | 'all');
  };

  const defaultLibraries: ['all', 'reading', 'pending', 'completed'] = ['all', 'reading', 'pending', 'completed'];

  return (
    <FullScreenModal
      handleClose={() => {
        onClose(false);
      }}
    >
      <Header
        title={{ text: '서재' }}
        rightBtn={{
          icon: (
            <button onClick={handleOpenEdit} className="opacity-50" type="button">
              편집
            </button>
          ),
          handleRightBtnClick: () => {},
        }}
      />
      <section className="h-[calc(100%_-_4rem)] overflow-y-auto pb-5">
        <div className="mb-2 ml-4">기본 서재</div>
        <Content>
          {defaultLibraries.map((title) => (
            <li key={title}>
              <button type="button" className="w-full" onClick={() => handleClick(title)}>
                <ContentItem>
                  {DefaultLibraryTitle[title]}
                  <CheckBox isChecked={title === selectedLibrary} />
                </ContentItem>
              </button>
            </li>
          ))}
        </Content>
        <div className="m-4 mb-2">사용자 지정 서재</div>
        <Content>
          {libraries.map(({ libraryId, libraryName }) => (
            <li key={libraryId}>
              <button type="button" className="w-full" onClick={() => handleClick(libraryId)}>
                <ContentItem>
                  {libraryName}
                  <CheckBox isChecked={libraryId === selectedLibrary} />
                </ContentItem>
              </button>
            </li>
          ))}
        </Content>
      </section>
    </FullScreenModal>
  );
};

export default LibrarySelectModal;
