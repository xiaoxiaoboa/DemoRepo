import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import {useRecoilState} from 'recoil'
import { loginedName } from "../../recoil"
import "./index.css"

export default function Login() {
  const navigate = useNavigate()
  const getId = useRef(null)
  const getPwd = useRef(null)
  const [userName, setName] = useRecoilState(loginedName)



  const handleLogin = async () => {
    const id = getId.current.value
    const pwd = getPwd.current.value
    await loginSubmit(id,pwd)

  }

  const loginSubmit = async (id,pwd) => {
    try{
      const res1 = await axios.post('/api/user/login',{jobId:id, passwd:pwd})
      const res2 = await axios.get(`/api/user/${getId.current.value}/a`)
      navigate(`/home`,{replace:true})
      setName(res2.data.realName)
      console.log(res2)
    }catch(err){
      // console.log(err.response.data.msg)
    }
  }


  const goRegister = () => {
    navigate("/register")
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
            <input placeholder="工号" className="loginInput" ref={getId} />
            <input
              type="password"
              placeholder="密码"
              className="loginInput"
              ref={getPwd}
            />
            <button className="loginButton" onClick={handleLogin}>
              登录
            </button>
            <button className="loginRegisterButton" onClick={goRegister}>
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
