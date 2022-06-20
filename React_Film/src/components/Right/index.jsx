import Dark from "../Dark"
import {Outlet} from 'react-router-dom'
import "./index.css"

export default function Right() {
  return (
    <main className="main">
      <div className="header">
        <div className="colorMode">
          <Dark />
        </div>
        <div className="login">Login</div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}
