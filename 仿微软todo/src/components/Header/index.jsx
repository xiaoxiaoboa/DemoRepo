import React from 'react'
import Dark from "../Dark"
import './index.css'

export default function Header() {
  // console.log('Header')
  return (
    <header className="header">
      {/* 标题 */}
      <div className='title'>To Do</div>
      {/* 搜索框 */}
      <div className="placeholder-input">
        <div className="input-box">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <input
            className="input"
            type="text"
            placeholder="输入关键词进行搜索"
          />
        </div>
      </div>
      <div className='theme'>
        <Dark />
      </div>
      {/* 头像 */}
      <div className="avatar">
        <img
          className="avatar-img"
          src="/avatar.png"
        />
      </div>
    </header>
  )
}
