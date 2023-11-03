import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/layout/layout.component";
import AuthProvider from "./providers/auth.provider";
import { AuthRoutes, DefaultRoutes } from "./routes/default.routes";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {AuthRoutes.map((route, key) => {
          return (
            <Route
              path={route.path}
              element={route.component}
              key={key}
            ></Route>
          );
        })}

        <Route path="/" element={<PageLayout />}>
          {DefaultRoutes.map((route, key) => {
            return (
              <Route
                path={route.path}
                element={route.component}
                key={key}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
