import axios from "axios";
import { toast } from "react-toastify";
import { MUSIC_RAPID_API, ApiHeaders } from "../config/api.config";
import { KeyValueConverter } from "../helper/keyValueConvert.helper";
import { UserSearchDTO } from "../Model/userSearch.model";
import { UserDetailDTO } from "../Model/userDetails.model";
import authService from "./auth.service";

type searchByUrlProps = {
  userUrl: string;
  dataSource: any[];
  setDataSource: (e: any[]) => void;
  loggedUser: UserDetailDTO;
  setLoggedUser: (e: UserDetailDTO) => void;
};
type SearchByUserInputProps = {
  userSearchInput: UserSearchDTO;
  dataSource: any[];
  setDataSource: (e: any[]) => void;
  loggedUser: UserDetailDTO;
  setLoggedUser: (e: UserDetailDTO) => void;
};

type fetchApiProps = {
  setPlatformList: (e: any[]) => void;
};

const RapidApiService = () => {
  const { updatedCount } = authService();

  const searchByUrl = async ({
    dataSource,
    setDataSource,
    userUrl,
    loggedUser,
    setLoggedUser,
  }: searchByUrlProps) => {
    if (!userUrl) return toast("Please enter the URL", { type: "error" });

    const options = {
      method: "POST",
      url: MUSIC_RAPID_API + "/inspect/url",
      headers: ApiHeaders,
      data: {
        url: userUrl,
      },
    };

    try {
      const response = await axios.request(options);
      const _data = [...dataSource];
      const _searchCount = loggedUser.searchCount - 1;
      let _res = response.data;
      _data.push(_res);
      setDataSource(_data);
      updatedCount({
        email: loggedUser.email,
        searchCount: loggedUser.searchCount - 1,
      });
      setLoggedUser({ ...loggedUser, ["searchCount"]: _searchCount });

      toast("Your search result added to table", { type: "success" });
    } catch (error: any) {
      console.error(error);
      const message = error.message;
      toast(message, { type: "error" });
    }
  };

  const SearchByUserInput = async ({
    dataSource,
    setDataSource,
    userSearchInput,
    loggedUser,
    setLoggedUser,
  }: SearchByUserInputProps) => {
    if (
      !userSearchInput.track ||
      !userSearchInput.artist ||
      !userSearchInput.type ||
      userSearchInput.source.length === 0
    )
      return toast("All fields are mandatory", { type: "error" });
    const options = {
      method: "POST",
      url: MUSIC_RAPID_API + "/search",
      headers: ApiHeaders,
      data: {
        track: userSearchInput.track,
        artist: userSearchInput.artist,
        type: userSearchInput.type,
        sources: [userSearchInput.source],
      },
    };
    try {
      const response = await axios.request(options);
      const _data = [...dataSource];
      let _res = response?.data;

      let _temp: any = {};
      if (userSearchInput.type === "track") {
        _temp = _res["tracks"][0];
      } else {
        _temp = _res["albums"][0];
      }
      if (!_temp.data) return toast("Invalid Response", { type: "error" });
      if (!_temp.data.url)
        return toast("Platform authentication Failed", { type: "error" });

      const _searchCount = loggedUser.searchCount - 1;

      _data.push(_temp);

      updatedCount({
        email: loggedUser.email,
        searchCount: _searchCount,
      });
      setLoggedUser({ ...loggedUser, ["searchCount"]: _searchCount });

      setDataSource(_data);
      toast(`Your ${userSearchInput.type} added to table`, { type: "success" });
    } catch (error: any) {
      console.error(error);
      const message = error.message;
      toast(message, { type: "error" });
    }
  };

  const fetchPlatforms = async ({ setPlatformList }: fetchApiProps) => {
    const options = {
      method: "GET",
      url: MUSIC_RAPID_API + "/search/introspection",
      headers: ApiHeaders,
    };
    try {
      const response = await axios.request(options);

      const _data = KeyValueConverter(response.data.authSources);
      setPlatformList(_data);
    } catch (error) {
      console.error(error);
    }
  };

  return { searchByUrl, fetchPlatforms, SearchByUserInput };
};

export default RapidApiService;
