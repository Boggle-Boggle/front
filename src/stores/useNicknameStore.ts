import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NicknameStoreType = {
  nickname: string;
  setNickname: (nickname: string) => void;
};

const useNicknameStore = create<NicknameStoreType>()(
  persist(
    (set) => ({
      nickname: '',
      setNickname: (nickname) => {
        set({ nickname });
      },
    }),
    { name: 'nickname-store' },
  ),
);

export default useNicknameStore;
