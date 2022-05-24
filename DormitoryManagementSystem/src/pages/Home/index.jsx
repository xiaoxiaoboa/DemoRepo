import "./index.css"
import Sidebar from "../../components/Sidebar"
import { Outlet } from "react-router-dom"

export default function Home() {
  return (
    <div className="homecontainer">
      <div className="homeWrapper">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
