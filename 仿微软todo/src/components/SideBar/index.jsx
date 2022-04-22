import React from "react"
import Dark from "../Dark"
import { NavLink } from "react-router-dom"
import "./index.css"

export default function SideBar() {
  return (
    <div className="SideBar-box">
      <div className="placeholder-sidebox">
        <a href="https://zh-hans.reactjs.org/" target={"_blank"}>
          <div className="gb-box">
            <img src="/react.svg" className="reactlogo" />
          </div>
        </a>
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
            <Dark />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
