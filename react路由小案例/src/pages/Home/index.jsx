import React, { Component } from 'react'
import MyNavLink from "../../components/MyNavLink"
import { Route, Redirect } from "react-router-dom"
import News from './News'
import Messages from './Messages'

import './index.css'

export default class Home extends Component {
  render() {
    return (
      <div>
        <span className="msg">我是Home，哇哈哈哈哈哈哈~</span>
        <div className="placeholder-home"></div>
        <div className="news-box">
          <div className="news-nav">
            <ul className="nav-list">
              <li>
                <MyNavLink to="/home/news">News</MyNavLink>
              </li>
              <li>
                <MyNavLink to="/home/messages">Messages</MyNavLink>
              </li>
            </ul>
          </div>
          <div className="placeholder2-home"></div>
          <hr />
          <div className="placeholder2-home"></div>
          <div className="news-info">
            <Route path="/home/news" component={News} />
            <Route path="/home/messages" component={Messages} />
            {/* <Redirect to="/home/news" /> */}
          </div>
        </div>
      </div>
    )
  }
}
