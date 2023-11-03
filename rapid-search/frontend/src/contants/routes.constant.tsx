import { BiSolidSearchAlt2 } from "react-icons/bi";
import { MdContentPasteSearch } from "react-icons/md";

export const ROUTES = {
  SEARCH: "/",
  SEARCH_BY_URL: "/searchByUrl",
  LOG_IN: "/login",
  SIGN_UP: "/signUp",
};

export const RouteMenu = [
  {
    key: ROUTES.SEARCH,
    icon: <BiSolidSearchAlt2 />,
    label: "Search",
    route: ROUTES.SEARCH,
  },
  {
    key: ROUTES.SEARCH_BY_URL,
    icon: <MdContentPasteSearch />,
    label: "Search By URL",
    route: ROUTES.SEARCH_BY_URL,
  },
];
