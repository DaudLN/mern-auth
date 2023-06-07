import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UserInfo {
  _id?: string;
  name?: string;
  email?: string;
}

interface UserStore {
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
}

const userStore = persist<UserStore>(
  (set) => ({
    userInfo: {},
    setUserInfo: (user) => set(() => ({ userInfo: user })),
  }),
  { name: 'userInfo' }
);

const useUserStore = create(devtools(userStore, {trace:true}));

export default useUserStore;
