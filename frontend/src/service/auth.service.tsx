import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/api.config";
import { UserDetailDTO, UserLoginDTO } from "../Model/userDetails.model";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../helper/localStorage.helper";

interface LoginProps {
  userLogin: UserLoginDTO;
  setTokenAtom: (e: string) => void;
  setToken: (e: string) => void;
}

interface RegisterProps {
  user: UserDetailDTO;
  setUser: (e: UserDetailDTO) => void;
}

interface LogoutProps {
  resetUser: (e: UserLoginDTO) => void;
}

interface updateCountProps {
  email: string;
  searchCount: number;
}

const authService = () => {
  const navigate = useNavigate();

  const LoginService = async ({
    userLogin,
    setToken,
    setTokenAtom,
  }: LoginProps) => {
    const options = {
      method: "POST",
      url: BACKEND_API + "/login",
      data: userLogin,
    };

    try {
      const response = await axios.request(options);
      const _data = response.data;
      const _token = _data.accessToken;
      setToken(_token);
      setTokenAtom(_token);
      navigate("/");
      toast("User Logged in", { type: "success" });
    } catch (error: any) {
      const message = error?.response?.data?.error;
      console.log(message);
      toast(message, { type: "error" });
    }
  };

  const RegisterCustomer = async ({ user, setUser }: RegisterProps) => {
    const payload = {
      ...user,
      ["customerId"]: "",
      ["subscriptionId"]: "",
    };
    const options = {
      method: "POST",
      url: BACKEND_API + "/register-customers",
      data: payload,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      navigate("/login");
      toast("User Registered", { type: "success" });
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.error;
      toast(message, { type: "error" });
    }
  };

  const LogoutService = ({ resetUser }: LogoutProps) => {
    clearLocalStorage();
    navigate("/login");
    toast("User Logged out", { type: "success" });
    resetUser({} as UserLoginDTO);
  };

  const updatedCount = async ({ email, searchCount }: updateCountProps) => {
    const options = {
      method: "POST",
      url: BACKEND_API + "/update-searchCount",
      data: { email: email, searchCount: searchCount },
    };
    try {
      const response = await axios.request(options);
      const _data = response.data;
      console.log(_data);
      toast("User count Update", { type: "success" });
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.error;
      toast(message, { type: "error" });
    }
  };

  return { LoginService, RegisterCustomer, LogoutService, updatedCount };
};

export default authService;
