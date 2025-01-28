import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { SetStateAction, useState } from 'react';

import CheckBox from 'components/CheckBox';
import HalfScreenModal from 'components/HalfScreenModal';

import { addLibrary, removeLibrary } from 'services/library';

import { CustomLibrary, Libraries, StatusLibrary } from 'types/library';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

type LibraryEditedModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
  handleOpenSelect: React.Dispatch<SetStateAction<boolean>>;
  libraries: Libraries;
  refetchLibraries: (options?: RefetchOptions) => Promise<QueryObserverResult<Libraries, Error>>;
  setSelectedLibrary: React.Dispatch<SetStateAction<CustomLibrary | StatusLibrary>>;
};

const LibraryEditedModal = ({
  onClose,
  handleOpenSelect,
  libraries,
  refetchLibraries,
  setSelectedLibrary,
}: LibraryEditedModalProps) => {
  const [values, setValues] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!values) return;
      await addLibrary(values);
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
    if (e.target.value.length > 14) return;
    setValues(e.target.value);
  };

  const handleRemoveLibrary = async (removeId: number) => {
    await removeLibrary(removeId);
    queryClient.invalidateQueries({ queryKey: ['libraries'] });
    setSelectedLibrary({ status: 'all', libraryName: '전체보기', bookCount: 0 });
    await refetchLibraries();
  };

  return (
    <HalfScreenModal>
      <section>
        <div className="z-30 grid h-headerAnd w-full grid-cols-[30px_auto_30px] items-center px-4">
          <span className="justify-self-start" />
          <span className="w-full justify-self-center text-center font-semibold">서재 편집</span>
          <button className="justify-self-end text-accent" type="button" onClick={handleClose}>
            완료
          </button>
        </div>

        <div className="flex h-10 w-full items-center justify-between px-4">
          <input
            placeholder="추가하고 싶은 서재명을 입력하세요"
            value={values}
            onChange={(e) => handleChange(e)}
            className="h-10 w-[92%] rounded-md p-3 pr-2"
          />
          <button type="submit" aria-label="서재 추가" onClick={() => mutate()}>
            <CheckBox type="plus" isChecked={values.length > 0} />
          </button>
        </div>
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
      </section>
    </HalfScreenModal>
  );
};

export default LibraryEditedModal;
