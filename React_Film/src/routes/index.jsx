import React from "react"
import { useRoutes } from "react-router-dom"
import Home from "../pages/Home"
import FilmDetail from "../components/FilmDetail"
import CategoryDetails from "../components/CategoryDetails"

export default function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <CategoryDetails />
        },
        {
          path: "/filmdetail",
          element: <FilmDetail />
        }
      ]
    }
  ])

  return element
}
