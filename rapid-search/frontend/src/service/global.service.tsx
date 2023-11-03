import axios from "axios";
import { BACKEND_API, STRIPE_API } from "../config/api.config";
import {
  SubscriptionDTO,
  SubscriptionHistoryDTO,
  UserDetailDTO,
} from "../Model/userDetails.model";
import { toast } from "react-toastify";

type fetchAllCusProps = {
  setUserList: (e: UserDetailDTO[]) => void;
};

type fetchSubsProps = {
  setSubscriptions: (e: SubscriptionDTO[]) => void;
};
type fetchSubsHistoryProps = {
  setSubscriptionHistory: (e: SubscriptionHistoryDTO[]) => void;
};
type CurrentUserProps = {
  setLoggedUser: (e: UserDetailDTO) => void;
  token: string;
};

const GlobalService = () => {
  const fetchAllCustomer = async ({ setUserList }: fetchAllCusProps) => {
    const options = {
      method: "GET",
      url: BACKEND_API + "/all-customers",
    };
    try {
      const response = await axios.request(options);
      setUserList(response.data);
    } catch (error: any) {
      const message = error?.response?.data?.error;
      console.log(message);
      toast(message, { type: "error" });
    }
  };

  const FetchAllSubscriptions = async ({
    setSubscriptions,
  }: fetchSubsProps) => {
    const options = {
      method: "GET",
      url: STRIPE_API + "getAllProducts/",
    };
    try {
      const response = await axios.request(options);
      setSubscriptions(response.data);
    } catch (error: any) {
      const message = error?.response?.data?.error;
      console.log(message);
      toast(message, { type: "error" });
    }
  };

  const fetchSubscriptionHistory = async ({
    setSubscriptionHistory,
  }: fetchSubsHistoryProps) => {
    const options = {
      method: "GET",
      url: STRIPE_API + "subscription-history",
    };
    try {
      const response = await axios.request(options);
      setSubscriptionHistory(response.data);
    } catch (error: any) {
      const message = error?.response?.data?.error;
      console.log(message);
      toast(message, { type: "error" });
    }
  };

  const fetchCurrentUser = async ({
    token,
    setLoggedUser,
  }: CurrentUserProps) => {
    const options = {
      method: "GET",
      url: BACKEND_API + "/current-user",
      headers: {
        Authorization: "Bearer" + " " + token,
      },
    };
    try {
      const response = await axios.request(options);
      const _data = response.data;
      console.log(_data);

      if (_data.isSubscribed) {
        localStorage.setItem("isSubscribed", "true");
      } else {
        localStorage.setItem("isSubscribed", "false");
      }
      setLoggedUser(_data);
    } catch (error: any) {
      const message = error?.response?.data?.error;
      console.log(message);
      toast(message, { type: "error" });
    }
  };

  return {
    fetchAllCustomer,
    FetchAllSubscriptions,
    fetchSubscriptionHistory,
    fetchCurrentUser,
  };
};

export default GlobalService;
