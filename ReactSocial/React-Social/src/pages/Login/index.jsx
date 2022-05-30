import { useContext, useRef } from "react"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from "@mui/material"
import "./index.css"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const email = useRef()
  const passwd = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext)
  const nagivate = useNavigate()

  const handleClick = e => {
    e.preventDefault()
    loginCall(
      { email: email.current.value, password: passwd.current.value },
      dispatch
    )
  }

  const handlerGoRegister = () => {
    nagivate('/register')
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
              ref={passwd}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Log in"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handlerGoRegister}>
              {isFetching ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Create a New Account"
              )}

            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
