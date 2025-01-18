import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { SetStateAction, useState } from 'react';

import CheckBox from 'components/CheckBox';
import HalfScreenModal from 'components/HalfScreenModal';
import Header from 'components/Header';

import { addLibrary, removeLibrary } from 'services/library';

import { Libraries } from 'types/library';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

type LibraryEditedModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
  handleOpenSelect: React.Dispatch<SetStateAction<boolean>>;
  libraries: Libraries;
  refetchLibraries: (options?: RefetchOptions) => Promise<QueryObserverResult<Libraries, Error>>;
};

const LibraryEditedModal = ({ onClose, handleOpenSelect, libraries, refetchLibraries }: LibraryEditedModalProps) => {
  const [values, setValues] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate: handleAddLibrary } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!values) return;

      addLibrary(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraries'] });
      refetchLibraries();
      setValues('');
    },
  });

  const handleClose = () => {
    handleOpenSelect(true);
    onClose(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 15) return;
    setValues(e.target.value);
  };

  const handleRemoveLibrary = (removeId: number) => {
    removeLibrary(removeId);
    queryClient.invalidateQueries({ queryKey: ['libraries'] });
    refetchLibraries();
  };

  return (
    <HalfScreenModal>
      <div>
        <Header
          title={<span className="text-base">서재 편집</span>}
          rightBtn={
            <button onClick={handleClose} type="button">
              완료
            </button>
          }
        />
      </div>
      <form className="flex h-10 w-full items-center justify-between px-4" onSubmit={(e) => handleAddLibrary(e)}>
        <input
          placeholder="추가하고 싶은 서재명을 입력하세요"
          value={values}
          onChange={(e) => handleChange(e)}
          className="h-10 w-[92%] rounded-md p-3 pr-2"
        />
        <button type="submit" aria-label="서재 추가">
          <CheckBox type="plus" isChecked={values.length > 0} />
        </button>
      </form>
      <div className="m-4 mb-2">사용자 지정 서재</div>
      <div className="h-[calc(100%_-_9.5rem)] overflow-y-auto pb-8">
        <Content>
          {libraries.libraryList.map(({ libraryName, libraryId }) => (
            <ContentItem>
              <li key={libraryId} className="flex h-full items-center">
                <button
                  className="h-full pr-2"
                  type="button"
                  aria-label="서재 삭제"
                  onClick={() => handleRemoveLibrary(libraryId)}
                >
                  <CheckBox type="minus" color="red" />
                </button>
                {libraryName}
              </li>
            </ContentItem>
          ))}
        </Content>
      </div>
    </HalfScreenModal>
  );
};

export default LibraryEditedModal;
