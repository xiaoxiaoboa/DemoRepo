import "./index.css"
import Online from "../Online"
import {Users} from '../../dummyData'
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@mui/icons-material"

export default function Rightbar(props) {
  const { user } = props
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([])
  const { user: currentUser } = useContext(AuthContext)
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user])

  useEffect(() => {
    getFriends()
  }, [user])

  const getFriends = async () => {
    try {
      const friendList = await axios.get(`/api/users/friends/${user._id}`)
      setFriends(friendList.data)
    } catch (err) {
      console.log(err)
    }
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="rightbar">
          <div className="rightbarWrapper">
            <div className="birthdayContainer">
              <img src="/assets/gift.png" alt="" className="birthdayImg" />
              <span className="birthdayText">
                <b>Pola Foster</b> and <b>3 other friends</b> have a birthday
                today.
              </span>
            </div>
            <img src="/assets/ad.png" alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
              {Users.map(u => (
                <Online key={u.id} user={u} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  const handlerClick = async () => {
    try {
      if (followed) {
        await axios.put(`/api/users/${user._id}/unfollow`, {
          userId: currentUser._id
        })
      } else {
        await axios.put(`/api/users/${user._id}/follow`, {
          userId: currentUser._id
        })
      }
      setFollowed(!followed)
    } catch (err) {}
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handlerClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Infomation</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link
              to={`/profile/${friend.username}`}
              key={friend._id}
              style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img
                  src={PF + (friend.profilePicture || "/person/noAvatar.png")}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
