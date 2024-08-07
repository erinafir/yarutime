import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Task from "./component/Task";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import UpdateProfile from "./pages/UpdateProfile";
import SpotifyPage from "./pages/Spotify";
import OpenAi from "./pages/OpenAi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem('token')) {
        return redirect('/app')
      }
      return null
    }
  },
  {

    element: <HomePage />,
    loader: () => {
      if (!localStorage.getItem('token')) {
        return redirect('/login')
      }
      return null
    },
    children: [
      {
      path: "/app",
      element: <Task />
    },
    {
      path: "/app/add",
      element: <AddTask />
    },
    {
      path: "/app/update/:id",
      element: <UpdateTask />
    },
    {
      path: "/app/user-update/:id",
      element: <UpdateProfile />
    },
    {
      path: "/app/spotify",
      element: <SpotifyPage />
    },
    {
      path: "/app/openAI",
      element: <OpenAi />
    },
  ]
  },
]);

export default router