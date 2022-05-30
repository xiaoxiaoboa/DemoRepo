import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"

export default function Register() {
  const username = useRef()
  const email = useRef()
  const passwd = useRef()
  const passwdAgain = useRef()
  const navigate = useNavigate()

  const handleClick = async e => {
    e.preventDefault()
    console.log(passwd.current.value)
    console.log(passwdAgain.current.value)
    if(passwdAgain.current.value !== passwd.current.value){
      console.log('密码不匹配')
    }else{
      const user={
        username: username.current.value,
        email: email.current.value,
        password: passwd.current.value,
      }
      try{
        await axios.post('/api/auth/register', user)
        navigate('/login')
      }catch(err){

      }

    }
  }

  const handlerGoLogin = () => {
    navigate('/login')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">React Social</h3>
          <span className="loginDesc">
            Connect with friends and the world arount you on React Social
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              required
              ref={username}
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              ref={passwd}
              minLength="6"
            />
            <input
              placeholder="Password Again"
              type="password"
              className="loginInput"
              required
              ref={passwdAgain}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={handlerGoLogin}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
