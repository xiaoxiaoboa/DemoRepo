import "./index.css"

export default function CloseFriend(props) {
  const { user } = props
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER
  return (
    <div>
      <li className="sidebarFriend">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </div>
  )
}
