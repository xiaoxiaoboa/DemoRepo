import React, { Component } from "react"
import PubSub from "pubsub-js"

import "./index.css"

export default class List extends Component {
  //初始化state
  state = {
    users: [], //users信息
    isFirst: true, //是否第一次打开页面
    isLoading: false, //是否在加载中
    err: "" //请求的错误信息
  }

  //组件挂在完成后，订阅消息
  componentDidMount() {
    this.token = PubSub.subscribe("hello", (msg, stateObj) => {
      this.setState(stateObj)
    })
  }

  //即将卸载组件时，取消订阅
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state
    return (
      <div className="cards">
        <div className="cards-box">
          {isFirst ? (
            <h2>输入名字进行搜索</h2>
          ) : isLoading ? (
            <h2>正在搜索....</h2>
          ) : err ? (
            <h2 style={{ color: "red" }}>{err}</h2>
          ) : (
            users.map(userObj => {
              return (
                <div key={userObj.id} className="card">
                  <a href={userObj.html_url} target="_blank">
                    <img className="img" src={userObj.avatar_url} />
                  </a>
                  <p className="card-text">{userObj.login}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }
}
