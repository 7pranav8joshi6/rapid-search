import { atom } from "recoil";
import { SearchResultDTO } from "../Model/searchResult.model";

export const AtomPlatformStore = atom<string[]>({
  key: "AtomUserStore",
  default: [],
});

export const AtomSearchResultByUrlList = atom<SearchResultDTO[]>({
  key: "AtomSearchByUrlList",
  default: [],
});

export const AtomSearchByUserInputResultsList = atom<SearchResultDTO[]>({
  key: "AtomSearchByUserInputList",
  default: [],
});
