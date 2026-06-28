import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEY } from 'constants/storage';

const RECENT_SEARCH_LIMIT = 10;

type RecentSearchStoreType = {
  recentSearches: string[];
  addRecentSearch: (keyword: string) => void;
  removeRecentSearch: (keyword: string) => void;
  clearRecentSearches: () => void;
};

export const useRecentSearchStore = create<RecentSearchStoreType>()(
  persist(
    (set) => ({
      recentSearches: [],
      addRecentSearch: (keyword) => {
        set((state) => ({
          recentSearches: [keyword, ...state.recentSearches.filter((recentSearch) => recentSearch !== keyword)].slice(
            0,
            RECENT_SEARCH_LIMIT,
          ),
        }));
      },
      removeRecentSearch: (keyword) => {
        set((state) => ({
          recentSearches: state.recentSearches.filter((recentSearch) => recentSearch !== keyword),
        }));
      },
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: STORAGE_KEY.RECENT_SEARCH_KEYWORDS,
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);
