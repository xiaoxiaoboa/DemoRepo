import OneDay from "../pages/OneDay"
import Tomorrow from "../pages/Tomorrow"
import Important from "../pages/Important"
import {Navigate} from 'react-router-dom'

export default [
  {
    path: "/oneday",
    element: <OneDay />
  },
  {
    path: "/tomorrow",
    element: <Tomorrow />
  },
  {
    path: "/important",
    element: <Important />
  },
  {
    path: "/",
    element: <Navigate to="/oneday" />
  }
]
