import React, { Component } from "react"
import About from "./pages/About"
import Home from "./pages/Home"
import {Route, Redirect } from "react-router-dom"
import MyNavLink from './components/MyNavLink'
import Test from './components/Test'

import "./App.css"
export default class App extends Component {

  handleClick = (e) => {
    const {target} = e
    const allChildrenNode = target.parentNode.children
    for(let i=0;i<allChildrenNode.length;i++){
      allChildrenNode[i].classList.remove('active')
    }
    target.classList.add('active')
  }

  render() {
    return (
      <div className="container">
        <div className="placeholder"></div>
        <div className="title">
          <h1>React Router Demo</h1>
          <Test />
        </div>
        <hr />
        <div className="placeholder2"></div>
        <div className="nav-show">
          <div className="nav">
            {/* 路由链接 NavLink在点击时会追加上active类名，如果你正好设置了active，可以不写：activeClassName="active"*/}
            <MyNavLink to="/about" className="item">
              About
            </MyNavLink>
            <MyNavLink to="/home" className="item">
              Home
            </MyNavLink>
          </div>
          <div className="show">
            {/* 注册路由 */}
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
            {/* <Redirect to="/home" /> */}
          </div>
        </div>
      </div>
    )
  }
}
