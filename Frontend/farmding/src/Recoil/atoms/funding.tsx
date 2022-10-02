import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface IFundingTypes {
  // id: number;
  // contents: string;
  // isCompleted: boolean;
}

export const likeFundingsListState = atom<IFundingTypes[]>({
  key: "likeFundingsListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const likeButtonChangeState = atom<boolean>({
  key: "likeButtonChangeState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
