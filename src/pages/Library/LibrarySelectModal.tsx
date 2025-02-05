import { SetStateAction } from 'react';

import CheckBox from 'components/CheckBox';
import HalfScreenModal from 'components/HalfScreenModal';

import { Libraries, CustomLibrary, StatusLibrary } from 'types/library';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

type LibrarySelectModalProps = {
  libraries: Libraries;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  handleEdit: React.Dispatch<SetStateAction<boolean>>;
  selectedLibrary: CustomLibrary | StatusLibrary;
  setSelectedLibrary: React.Dispatch<SetStateAction<CustomLibrary | StatusLibrary>>;
};

const LibrarySelectModal = ({
  libraries,
  onClose,
  handleEdit,
  selectedLibrary,
  setSelectedLibrary,
}: LibrarySelectModalProps) => {
  const { statusList: statusLibrary, libraryList: customLibrary } = libraries;

  const handleOpenEdit = () => {
    handleEdit(true);
    onClose(false);
  };

  const handleClick = (selected: CustomLibrary | StatusLibrary) => {
    setSelectedLibrary(selected);
    onClose(false);
  };

  return (
    <HalfScreenModal
      handleClose={() => {
        onClose(false);
      }}
    >
      <section>
        <div className="z-30 grid h-headerAnd w-full grid-cols-[30px_auto_30px] items-center px-4">
          <span className="justify-self-start" />
          <span className="w-full justify-self-center text-center font-semibold">서재</span>
          <button className="justify-self-end opacity-50" type="button" onClick={handleOpenEdit}>
            편집
          </button>
        </div>

        <section className="h-full overflow-y-auto pb-8">
          <div className="mb-2 ml-4">기본 서재</div>
          <Content>
            {statusLibrary.map(({ status, libraryName, bookCount }) => (
              <li key={status}>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => handleClick({ status, libraryName, bookCount })}
                >
                  <ContentItem>
                    <p>
                      {libraryName}
                      <span className="px-1 opacity-50">({bookCount})</span>
                    </p>
                    <CheckBox isChecked={selectedLibrary.libraryName === libraryName} />
                  </ContentItem>
                </button>
              </li>
            ))}
          </Content>
          <div className="m-4 mb-2">사용자 지정 서재</div>
          <Content>
            {customLibrary.length === 0 && (
              <ContentItem>
                <p className="opacity-50">사용자 지정 서재 없음</p>
              </ContentItem>
            )}
            {customLibrary.map(({ libraryId, libraryName, bookCount }) => (
              <li key={libraryId}>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => handleClick({ libraryId, libraryName, bookCount })}
                >
                  <ContentItem>
                    <p>
                      {libraryName}
                      <span className="px-1 opacity-50">({bookCount})</span>
                    </p>
                    <CheckBox isChecked={'libraryId' in selectedLibrary && selectedLibrary.libraryId === libraryId} />
                  </ContentItem>
                </button>
              </li>
            ))}
          </Content>
        </section>
      </section>
    </HalfScreenModal>
  );
};

export default LibrarySelectModal;
