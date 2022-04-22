import OneDay from "../pages/OneDay"
import Tomorrow from "../pages/Tomorrow"
import Important from "../pages/Important"
import { Navigate, useRoutes } from "react-router-dom"

import React from "react"

export default function Routes() {
  const element = useRoutes([
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
  ])
  return element
}
