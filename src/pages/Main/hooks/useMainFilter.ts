import { useState } from 'react';

import { STORAGE_KEY } from 'constants/storage';

import type { MainPeriodFilterType } from '../types';

type MainFilterSelection = {
  filter: MainPeriodFilterType;
  bookshelfId: number | null;
  year: number;
  month: number;
};

const getStoredMainFilter = (): MainFilterSelection => {
  const now = new Date();
  const defaultSelection: MainFilterSelection = {
    filter: 'ALL',
    bookshelfId: null,
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };

  if (typeof window === 'undefined') return defaultSelection;

  const storedValue = window.localStorage.getItem(STORAGE_KEY.MAIN_BOOKSHELF_FILTER);
  if (!storedValue) return defaultSelection;

  try {
    const parsed: unknown = JSON.parse(storedValue);
    if (typeof parsed !== 'object' || parsed === null) return defaultSelection;

    const { filter, bookshelfId, year, month } = parsed as Record<string, unknown>;
    const validBookshelfId = typeof bookshelfId === 'number' && Number.isSafeInteger(bookshelfId) && bookshelfId > 0;
    const validYear = typeof year === 'number' && Number.isInteger(year) && year >= 2000 && year <= now.getFullYear();
    const validMonth = typeof month === 'number' && Number.isInteger(month) && month >= 1 && month <= 12;

    if (filter !== 'ALL' && filter !== 'GROUP' && filter !== 'PERIOD') return defaultSelection;
    return {
      filter,
      bookshelfId: filter === 'GROUP' && validBookshelfId ? bookshelfId : null,
      year: validYear ? year : defaultSelection.year,
      month: validMonth ? month : defaultSelection.month,
    };
  } catch {
    return defaultSelection;
  }
};

export const useMainFilter = () => {
  const [filterSelection, setFilterSelection] = useState<MainFilterSelection>(getStoredMainFilter);

  const updateFilterSelection = (selection: MainFilterSelection) => {
    window.localStorage.setItem(STORAGE_KEY.MAIN_BOOKSHELF_FILTER, JSON.stringify(selection));
    setFilterSelection(selection);
  };

  return { filterSelection, updateFilterSelection };
};
