import { useState } from 'react';

import { STORAGE_KEY } from 'constants/storage';

import type { InterestedBookSort, ReadingLogSort } from '../api';

const DEFAULT_READING_SORT: ReadingLogSort = 'START_DATE_DESC';
const DEFAULT_WISHLIST_SORT: InterestedBookSort = 'RECENT';

const READING_SORT_TYPES: ReadingLogSort[] = [
  'START_DATE_DESC',
  'START_DATE_ASC',
  'END_DATE_DESC',
  'END_DATE_ASC',
  'RATING_DESC',
  'RATING_ASC',
  'CREATED_AT_DESC',
  'CREATED_AT_ASC',
];

const getInitialReadingSort = (): ReadingLogSort => {
  if (typeof window === 'undefined') return DEFAULT_READING_SORT;

  const storedSort = window.localStorage.getItem(STORAGE_KEY.LIBRARY_SORT_TYPE);
  return READING_SORT_TYPES.find((sort) => sort === storedSort) ?? DEFAULT_READING_SORT;
};

const getInitialWishlistSort = (): InterestedBookSort => {
  if (typeof window === 'undefined') return DEFAULT_WISHLIST_SORT;

  const storedSort = window.localStorage.getItem(STORAGE_KEY.LIBRARY_WISHLIST_SORT_TYPE);
  return storedSort === 'OLDEST' ? 'OLDEST' : DEFAULT_WISHLIST_SORT;
};

export const useLibrarySort = () => {
  const [readingSort, setReadingSort] = useState<ReadingLogSort>(getInitialReadingSort);
  const [wishlistSort, setWishlistSort] = useState<InterestedBookSort>(getInitialWishlistSort);

  const selectReadingSort = (nextSort: ReadingLogSort) => {
    window.localStorage.setItem(STORAGE_KEY.LIBRARY_SORT_TYPE, nextSort);
    setReadingSort(nextSort);
  };

  const selectWishlistSort = (nextSort: InterestedBookSort) => {
    window.localStorage.setItem(STORAGE_KEY.LIBRARY_WISHLIST_SORT_TYPE, nextSort);
    setWishlistSort(nextSort);
  };

  return { readingSort, wishlistSort, selectReadingSort, selectWishlistSort };
};
