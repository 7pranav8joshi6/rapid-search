import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../helper/localStorage.helper";
import GlobalService from "../service/global.service";
import { useSetRecoilState } from "recoil";
import { AtomSubsHistory, AtomSubscriptionList } from "../store/global.store";
import { AtomLoggedUser } from "../store/auth.store";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setSubscriptionHistory = useSetRecoilState(AtomSubsHistory);
  const setSubscriptions = useSetRecoilState(AtomSubscriptionList);
  const setLoggedUser = useSetRecoilState(AtomLoggedUser);
  const { fetchCurrentUser, fetchSubscriptionHistory, FetchAllSubscriptions } =
    GlobalService();
  let token = getToken();
  const navigate = useNavigate();

  const globalFetch = (token: string) => {
    fetchCurrentUser({ token, setLoggedUser });
    FetchAllSubscriptions({ setSubscriptions });
    fetchSubscriptionHistory({ setSubscriptionHistory });
    navigate("/");
  };

  useEffect(() => {
    token ? globalFetch(token) : navigate("/login");
  }, [token]);

  return <>{children}</>;
};

export default AuthProvider;
