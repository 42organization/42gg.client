import { atom } from "recoil";
import { v1 } from "uuid";
import { UserData } from "../../types/mainType";

export const userState = atom<UserData | null>({
  key: `userState/${v1()}`, // unique ID (다른 atoms/selectors을 구별하기 위해서)
  default: null, // default value (aka initial value)
});
