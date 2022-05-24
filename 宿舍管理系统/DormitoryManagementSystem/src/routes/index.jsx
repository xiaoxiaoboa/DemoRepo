import Home from "../pages/Home"
import Login from "../pages/Login"
import Drom1 from "../pages/Drom1"
import Drom2 from "../pages/Drom2"
import Register from "../pages/Register"
import Warning from "../components/Warning"
import { useRoutes,Navigate } from "react-router-dom"

export default function Routes() {
  const element = useRoutes([
    {
      path: "/home",
      element: <Home />,
      children: [
        { index: true, element: <Warning /> },
        {
          path: "drom1",
          element: <Drom1 />
        },
        {
          path: "drom2",
          element: <Drom2 />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/",
      element: <Navigate to={"login"} />
    }
  ])
  return element
}
