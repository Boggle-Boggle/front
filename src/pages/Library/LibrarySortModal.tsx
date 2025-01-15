import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { SetStateAction } from 'react';

import CheckBox from 'components/CheckBox';
import HalfScreenModal from 'components/HalfScreenModal';
import Header from 'components/Header';

import { changeLibrarySorting, getLibrarySorting } from 'services/library';

import { PaginationResponse } from 'types/api';
import { LibraryBook, SortingTitle, SortingType } from 'types/library';

import Content from './shared/Content';
import ContentItem from './shared/ContentItem';

type LibrarySortModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
  refetchBooks: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<InfiniteData<PaginationResponse<LibraryBook[]>, unknown>, Error>>;
};

const LibrarySortModal = ({ onClose, refetchBooks }: LibrarySortModalProps) => {
  const sortingOptions = Object.keys(SortingTitle) as SortingType[];
  const queryClient = useQueryClient();
  const {
    data: selectedOption,
    refetch: refetchSortingType,
    isFetched,
  } = useQuery({ queryKey: ['librarySorting'], queryFn: getLibrarySorting });

  const { mutate } = useMutation({
    mutationFn: changeLibrarySorting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryBooks'] });
      queryClient.invalidateQueries({ queryKey: ['librarySorting'] });
      refetchBooks();
    },
  });

  const handleOptionChange = (sortingOption: SortingType) => {
    refetchSortingType();
    mutate(sortingOption);
  };

  return (
    <HalfScreenModal
      handleClose={() => {
        onClose(false);
      }}
    >
      <Header title={<span className="text-base">정렬</span>} />
      <Content>
        {isFetched &&
          sortingOptions.map((sortingOption) => (
            <li key={sortingOption}>
              <button type="button" onClick={() => handleOptionChange(sortingOption)} className="w-full">
                <ContentItem>
                  <p className="opacity-70">{SortingTitle[sortingOption]}</p>
                  <CheckBox isChecked={selectedOption === sortingOption} />
                </ContentItem>
              </button>
            </li>
          ))}
      </Content>
    </HalfScreenModal>
  );
};

export default LibrarySortModal;
