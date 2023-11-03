import { atom } from "recoil";
import {
  SubscriptionDTO,
  SubscriptionHistoryDTO,
  UserDetailDTO,
} from "../Model/userDetails.model";

export const AtomUserList = atom<UserDetailDTO[]>({
  key: "AtomUserList",
  default: [],
});

export const AtomSubscriptionList = atom<SubscriptionDTO[]>({
  key: "AtomSubscriptionList",
  default: [],
});

export const AtomToken = atom<string>({
  key: "AtomToken",
  default: "",
});

export const AtomSubsHistory = atom<SubscriptionHistoryDTO[]>({
  key: "AtomSubsHistory",
  default: [],
});

export const AtomSubscriptionModal = atom<boolean>({
  key: "AtomSubscriptionModal",
  default: false,
});
