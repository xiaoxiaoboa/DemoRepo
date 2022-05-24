import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"

export default function Register() {
  const navigate = useNavigate()
  const getName = useRef(null)
  const getId = useRef(null)
  const getPwd = useRef(null)
  const getCode = useRef(null)


  const handleRegister = async () => {
    const fullName = getName.current.value
    const id = getId.current.value
    const pwd = getPwd.current.value
    const code = getCode.current.value
    await registerSubmit(id, pwd, code, fullName)
  }

  const registerSubmit = async (id, pwd, code, fullName) => {
    try {
      const res = await axios.post("/api/user/register", {
        realName: fullName,
        jobId: id,
        passwd: pwd,
        invitationCode: code
      })
      navigate("/login", { replace: true })
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

  const goLogin = () => {
    navigate('/login')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SIAS</h3>
          <span className="loginDesc">宿舍管理系统</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="姓名" className="loginInput" ref={getName} />
            <input placeholder="工号" className="loginInput" ref={getId} />
            <input
              placeholder="密码"
              type="password"
              className="loginInput"
              ref={getPwd}
            />
            <input
              placeholder="邀请码"
              type="text"
              className="loginInput"
              ref={getCode}
            />
            <button className="loginButton" onClick={handleRegister}>
              注册
            </button>
            <button className="loginRegisterButton" onClick={goLogin}>
              去登陆
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
