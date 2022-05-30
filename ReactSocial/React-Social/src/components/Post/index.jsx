import "./index.css"
import { MoreVert } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Post(props) {
  const { post } = props
  const [like, setLike] = useState(post.likes.length)
  const [isLike, setIsLike] = useState(false)
  const [user, setUser] = useState({})
  const { user: currentUser } = useContext(AuthContext)
  /* 使用vite时,需要用此配置 */
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER
  /* 使用Create-React-App时,使用此配置
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER
 */
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  const likeHandler = async () => {
    try {
      await axios.put("/api/posts/" + post._id + "/like", {
        userId: currentUser._id
      })
    } catch (err) {}
    setLike(isLike ? like - 1 : like + 1)
    setIsLike(!isLike)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={PF + (user.profilePicture || "/person/noAvatar.png")}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(new Date(post.createdAt))}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF+"/"+post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}/like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}/heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="likeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  )
}
