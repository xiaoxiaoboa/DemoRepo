import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

import "./App.css"

export default function App() {
  return (
    <div className="container">
      <Header />
      <div className="body">
        <SideBar />
        <Main />
      </div>
    </div>
  )
}
