import {lazy} from 'react'
import OneDay from "../pages/OneDay"
const Tomorrow = lazy(() => import("../pages/Tomorrow"))
const Important = lazy(() => import("../pages/Important"))
const AllTasks = lazy(() => import("../pages/AllTasks"))
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
      path: "/alltasks",
      element: <AllTasks />
    },
    
    {
      path: "/",
      element: <Navigate to="/oneday" />
    }
  ])
  return element
}
