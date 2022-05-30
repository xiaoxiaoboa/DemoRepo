import "./index.css"
import Topbar from "../../components/Topbar"
import Sidebar from "../../components/Sidebar"
import Feed from "../../components/Feed"
import Rightbar from "../../components/Rightbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function Profile() {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const { username } = useParams()

  useEffect(() => {
    fetchUser()
  }, [username])

  const fetchUser = async () => {
    const res = await axios.get(`/api/users?username=${username}`)
    setUser(res.data)
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PF + (user.coverPicture || "/person/noCover.png")}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={PF + (user.profilePicture || "/person/noAvatar.png")}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
