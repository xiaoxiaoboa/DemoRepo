import React from "react"
import { useRoutes, NavLink } from "react-router-dom"
import routes from "../../routes"
import "./index.css"

export default function Main() {
  const element = useRoutes(routes)

  return (
    <div className="main">
      <div className="SideBar-box">
        <div className="placeholder-sidebox">
          <div className="gb-box">
            <img
              src="https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/xiaoxin.58cqmwe5jas0.webp"
              alt="野原しんのすけ"
            />
          </div>
        </div>
        <div className="list-box">
          <ul className="list">
            <NavLink to={`/oneday`}>
              <li className="list-item">
                <div>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-taiyang"></use>
                  </svg>
                </div>
                <div className="oneday">我的一天</div>
                <div className="count">1</div>
              </li>
            </NavLink>
            <NavLink to={`/tomorrow`}>
              <li className="list-item">
                <div>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shizhong1"></use>
                  </svg>
                </div>
                <div className="tomorrow">明日待办</div>
                <div className="count">1</div>
              </li>
            </NavLink>
            <NavLink to={`important`}>
              <li className="list-item">
                <div>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-ai64"></use>
                  </svg>
                </div>
                <div className="important">重要</div>
                <div className="count">1</div>
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="placeholder-sidebox">
          <div className="setting-box">
            <div className="setting">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shezhi"></use>
              </svg>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="show-box">
          {/* <div className="toolbar">toolebar</div>
          <div className="taskcontainer">taskcontainer</div> */}
          {element}
      </div>
    </div>
  )
}
