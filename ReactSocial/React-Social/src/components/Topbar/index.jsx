import React, { useContext } from "react"
import { Search, Person, Chat, Notifications } from "@mui/icons-material/"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./index.css"

export default function Topbar() {
  const { user } = useContext(AuthContext)
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER
  return (
    <div className="topbarContainer">
      {/* header左部分,title */}
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">React-Social</span>
        </Link>
      </div>
      {/* 中间部分,搜索框 */}
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends , posts or video"
            className="searchInput"
          />
        </div>
      </div>
      {/* 右部分,头像,通知等 */}
      <div className="topbarRight">
        <div className="topbarLink">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  )
}
