import React from "react"
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import Routes from "./routes"


import "./App.css"

export default function App() {
  // console.log('App')
  return (
    <div className="container">
      <Header />
      <div className="body">
        <SideBar />
        <Routes />
      </div>
    </div>
  )
}
