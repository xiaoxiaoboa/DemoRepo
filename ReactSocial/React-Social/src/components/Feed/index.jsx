import "./index.css"
import Share from "../Share"
import Post from "../Post"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Feed(props) {
  const {username} = props
  const [posts, setPost] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {
    fetchPost()
  }, [username,user._id])

  const fetchPost = async () => {
    const res = username
      ? await axios.get("/api/posts/profile/"+ username)
      : await axios.get("/api/posts/timeline/" + user._id)
    setPost(
      res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
    )
  }
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map(p => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}
