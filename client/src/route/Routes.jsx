import Home from "../page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout";
import Login from "../page/Login";
import UserSettings from "../page/UserSettings";
import { ProtectedRoute } from "./ProtectedRoute";
import NewUser from "../page/NewUser";
import CreatePost from "../page/CreatePost";
import SinglePost from "../page/SinglePost";

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
        {
          path: "/newuser",
          element: (
            <ProtectedRoute>
              <NewUser />
            </ProtectedRoute>
          ),
        },
        {
          path: "/createpost",
          element: (
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/:username/:description",
          element: <SinglePost />,
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
