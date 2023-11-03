import { atom } from "recoil";
import { UserDetailDTO } from "../Model/userDetails.model";

export const AtomLoggedUser = atom<UserDetailDTO>({
  key: "AtomCurrentUser",
  default: {} as UserDetailDTO,
});
