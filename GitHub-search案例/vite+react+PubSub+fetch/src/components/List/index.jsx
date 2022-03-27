import React, { Component } from "react"
import PubSub from "pubsub-js"
import "./index.css"

export default class List extends Component {
  //初始化state
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: ""
  }

  //组件挂载后订阅消息
  componentDidMount() {
    this.token = PubSub.subscribe("hello", (msg, data) => {
      this.setState(data)
    })
  }

  //组件卸载前，取消订阅
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }
  
  render() {
    const { users, isFirst, isLoading, err } = this.state
    return (
      <div className="cards">
        <div className="cards-box">
          {isFirst ? (
            <h2>输出关键词，然后搜索</h2>
          ) : isLoading ? (
            <h2>Loading....</h2>
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
