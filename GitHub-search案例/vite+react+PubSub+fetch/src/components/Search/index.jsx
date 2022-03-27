import React, { Component } from "react"
import PubSub from "pubsub-js"

import "./index.css"

export default class Search extends Component {
  handleSearch = async () => {
    //解构赋值，拿到输入的关键词
    const {
      KeyWordElement: { value: keyWord }
    } = this

    PubSub.publish("hello", {
      isFirst: false,
      isLoading: true
    })

    //发送网络请求
    try {
      //1.服务器回应
      const response = await fetch(
        `https://api.github.com/search/users?q=${keyWord}`
      )
      //2.拿到结果
      const result = await response.json()

      //因为fetch请求，服务器只要有回应就没有报错，可能其实并没有拿到结果
      //所以需要对结果先判断
      if (result.items && result.items.length > 0) {
        //发布消息，传递关键词
        PubSub.publish("hello", { isLoading: false, users: result.items })
      } else {//如果结果出了问题，就抛出错误
        throw new Error("没有返回结果，可能是哪里出错了")
      }
    } catch (error) {
      PubSub.publish("hello", { isLoading: false, err: error.message })
    }
  }

  render() {
    return (
      <div className="search">
        <div className="content">
          <h2>搜索GitHub用户</h2>
          <div className="input-btn">
            <input
              ref={c => (this.KeyWordElement = c)}
              type="text"
              className="input"
              placeholder="输入关键词搜索"
            />
            <button className="btn-search" onClick={this.handleSearch}>
              搜索
            </button>
          </div>
        </div>
      </div>
    )
  }
}
