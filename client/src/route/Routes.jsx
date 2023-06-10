import Home from "../page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout";
import Login from "../page/Login";
import UserSettings from "../page/UserSettings";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/usersetting",
          element: (
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routes;
