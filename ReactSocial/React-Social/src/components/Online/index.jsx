import './index.css'

export default function Online(props) {
  const {user} = props
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER
  return (
    <div>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={PF+user.profilePicture}
            alt=""
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  )
}
