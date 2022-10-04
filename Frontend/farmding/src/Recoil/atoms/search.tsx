import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const isSearchStartState = atom<boolean>({
  key: "isSearchStartState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
