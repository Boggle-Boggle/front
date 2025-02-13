import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { SetStateAction, useReducer, useState } from 'react';

import Alert from 'components/Alert';
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
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);
  const [values, setValues] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      let isDuplicate = false;
      if (!values) return;

      libraries.libraryList.forEach((library) => {
        if (library.libraryName === values.trimEnd()) isDuplicate = true;
      });

      if (isDuplicate) {
        handleAlertActive();
        return;
      }
      await addLibrary(values.trimEnd());
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
    const newInputValue = e.target.value.trimStart();
    if (newInputValue.length > 15) return;

    setValues(newInputValue);
  };

  const handleRemoveLibrary = async (removeId: number) => {
    await removeLibrary(removeId);
    queryClient.invalidateQueries({ queryKey: ['libraries'] });
    setSelectedLibrary({ status: 'all', libraryName: '전체보기', bookCount: 0 });
    await refetchLibraries();
  };

  return (
    <>
      {isAlertActive && <Alert message="동일한 이름을 가진 서재가 있어요" onClose={handleAlertActive} />}
      <HalfScreenModal>
        <div className="fixed z-30 m-auto grid h-headerAnd w-full max-w-screen-sm grid-cols-[30px_auto_30px] items-center rounded-t-2xl bg-main px-4">
          <span className="justify-self-start" />
          <span className="w-full justify-self-center text-center font-semibold">서재 편집</span>
          <button className="justify-self-end text-accent" type="button" onClick={handleClose}>
            완료
          </button>
        </div>

        <div className="flex w-full items-center justify-between px-4 pt-headerAnd">
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
        <div className="overflow-y-auto pb-8">
          <Content>
            {libraries.libraryList.length === 0 && (
              <ContentItem>
                <p className="opacity-50">사용자 지정 서재 없음</p>
              </ContentItem>
            )}
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
    </>
  );
};

export default LibraryEditedModal;
