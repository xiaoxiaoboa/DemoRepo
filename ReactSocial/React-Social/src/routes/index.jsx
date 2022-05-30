import { useContext } from "react"
import { useRoutes, Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Register from "../pages/Register"


export default function Routes() {
  const { user } = useContext(AuthContext)
  const element = useRoutes([
    {
      path: "/",
      element: user ? <Home /> : <Login />
    },
    {
      path: "login",
      element: user ? <Navigate to={'/'}/> : <Login />
    },
    {
      path: "register",
      element: user ? <Navigate to={'/'}/> : <Register />
    },
    {
      path: "profile/:username",
      element: <Profile />
    }
  ])

  return element
}
