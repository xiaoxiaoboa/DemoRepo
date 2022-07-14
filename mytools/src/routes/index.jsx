import { useRoutes } from "react-router-dom"
import Home from "../pages/Home"
import Timer from "../pages/Timer"
import Todo from "../pages/Todo"

export default function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/timer",
          element: <Timer />
        },
        {
          path: "/todo",
          element: <Todo />
        }
      ]
    }
  ])

  return element
}
