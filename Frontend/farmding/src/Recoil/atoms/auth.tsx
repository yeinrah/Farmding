import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();


// export interface ITodoTypes {
//   id: number;
//   contents: string;
//   isCompleted: boolean;
// }

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// export const todoState = atom<ITodoTypes[]>({
//   key: "todos",
  
//   default: [
//     {
//       id: 1,
//       contents: "스트레칭 하기",
//       isCompleted: false,
//     },
//   ],
// });

// import { atom } from 'recoil';
// const showNavState = atom({
//   key: 'nav',
//   default: 'true',
// });
// export default showNavState;
