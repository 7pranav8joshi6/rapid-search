import axios from "axios";
import { toast } from "react-toastify";
import { STRIPE_API } from "../config/api.config";
import { SubscriptionDTO, UserDetailDTO } from "../Model/userDetails.model";

type subscribePlanProps = {
  setOpen: (e: boolean) => void;
  loggedUser: UserDetailDTO;
  setLoggedUser: (e: UserDetailDTO) => void;
  subscriptionPlan: SubscriptionDTO;
  paymentType: string;
};

const SubscriptionService = () => {
  const subscribePlan = async ({
    loggedUser,
    setOpen,
    subscriptionPlan,
    paymentType,
  }: subscribePlanProps) => {
    console.log(paymentType);
    const options = {
      method: "POST",
      url: STRIPE_API + "subscribe-plan",
      data: {
        user: { ...loggedUser, paymentType: paymentType },
        subscriptionPlan: subscriptionPlan,
      },
    };

    debugger;
    try {
      const response = await axios.request(options);
      const _data = response.data;
      window.location.assign(_data.url);
      setOpen(false);
      toast("Please wait payment proccessing", { type: "success" });
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.error;
      toast(message, { type: "error" });
    }
  };

  return { subscribePlan };
};

export default SubscriptionService;
