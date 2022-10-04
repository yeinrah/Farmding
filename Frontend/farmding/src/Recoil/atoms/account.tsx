import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// export interface ITodoTypes {
//   id: number;
//   contents: string;
//   isCompleted: boolean;
// }

export const currentUserNameState = atom<string>({
  key: "currentUserNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const currentUserIdState = atom<number>({
  key: "currentUserIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const isAccountChangedState = atom<boolean>({
  key: "isAccountChangedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export const currentProfileImageState = atom<string>({
  key: "currentProfileImageState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
