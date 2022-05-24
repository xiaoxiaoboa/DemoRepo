import "./index.css"
import Avatar from "@mui/material/Avatar"
import { NavLink } from "react-router-dom"
import { Switch, useDarkreader } from "react-darkreader"
import { loginedName } from "../../recoil"
import { useRecoilValue } from "recoil"


export default function Sidebar() {
  const [isDark, { toggle }] = useDarkreader(false)
  const userName = useRecoilValue(loginedName)

  return (
    <div className="sidebarContainer">
      <div className="sidebarWrapper">
        <ul className="sidebarlist">
          <li className="logo">
            <img src="/img/sias.jpg" alt="" className="logImg" />
          </li>
          <li>
            <div className="loginedUser">
              <Avatar
                alt="Remy Sharp"
                src="/avatar/1.jpg"
                className="userImg"
              />
              <span className="loginedUserName">{userName}</span>
            </div>
          </li>
          <li>
            <div className="sidebarList">
              <ul className="list">
                <NavLink to={"drom1"}>
                  <li className="listItem">
                    <Avatar
                      src="/img/zhixing.jpg"
                      sx={{ width: "32px", height: "32px" }}
                    />

                    <span className="itemName">知行住宿书院</span>
                  </li>
                </NavLink>
                <NavLink to={"drom2"}>
                  <li className="listItem">
                    <Avatar
                      src="/img/zhiyuan.jpg"
                      sx={{ width: "32px", height: "32px" }}
                    />
                    <span className="itemName">致远住宿书院</span>
                  </li>
                </NavLink>
              </ul>
            </div>
          </li>
        </ul>
        <div className="darkMode">
          <Switch checked={isDark} onChange={toggle} />
        </div>
      </div>
    </div>
  )
}
