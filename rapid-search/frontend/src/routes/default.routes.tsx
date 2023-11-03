import LoginPage from "../Modules/Login/Login.page";
import SearchByUrlPage from "../Modules/SearchByUrl/SearchByUrl.page";
import SignUpPage from "../Modules/Signup/SignUp.page";
import SearchByUserPage from "../Modules/searchByUser/SearchByUser.page";
import { ROUTES } from "../contants/routes.constant";

interface RoutesDTO {
  id: number;
  path?: string;
  component: any;
}

const getRoute = ({ id, component, path }: RoutesDTO) => {
  return {
    id,
    path,
    component,
  };
};

export const AuthRoutes = [
  getRoute({ id: 1, component: <LoginPage />, path: ROUTES.LOG_IN }),
  getRoute({ id: 2, component: <SignUpPage />, path: ROUTES.SIGN_UP }),
];

export const DefaultRoutes = [
  getRoute({ id: 3, component: <SearchByUserPage />, path: ROUTES.SEARCH }),
  getRoute({
    id: 3,
    component: <SearchByUrlPage />,
    path: ROUTES.SEARCH_BY_URL,
  }),
];
