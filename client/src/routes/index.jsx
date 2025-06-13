import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import App from "../pages/App";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

const AppRouter = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [{ path: "/", element: <App /> }],
    },
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ]);
  return routes;
};

export default AppRouter;
