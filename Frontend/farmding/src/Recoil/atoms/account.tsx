import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// export interface ITodoTypes {
//   id: number;
//   contents: string;
//   isCompleted: boolean;
// }

export const userNameState = atom<string>({
  key: "userNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const isAccountChangedState = atom<boolean>({
  key: "isAccountChangedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
