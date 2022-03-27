import React, { Component } from "react"
import axios from "axios"
import PubSub from "pubsub-js"

import "./index.css"

export default class Search extends Component {
  //解构赋值拿到实例对象里的keyword
  search = () => {
    const {
      keyWordElement: { value: keyWord }
    } = this
    const { updateState } = this.props

    //在点击搜索时，就要改变state了
    // updateState({ isFirst: false, isLoading: true })
    PubSub.publish("hello", { isFirst: false, isLoading: true })

    //发送axios get请求
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
      response => {
        const {
          data: { items }
        } = response
        // updateState({ isLoading: false, users: items })
        PubSub.publish("hello", { isLoading: false, users: items })
      },
      error => {
        // updateState({ isLoading: false, err: error.message })
        PubSub.publish("hello", {
          isLoading: false,
          err: error.message
        })
      }
    )

    //搜索后，把输入框置空
    this.keyWordElement.value = ""
  }

  render() {
    return (
      <div className="search">
        <div className="content">
          <h2>搜索GitHub用户</h2>
          <div className="input-btn">
            <input
              ref={c => (this.keyWordElement = c)}
              type="text"
              className="input"
              placeholder="输入关键词搜索"
            />
            <button className="btn-search" onClick={this.search}>
              搜索
            </button>
          </div>
        </div>
      </div>
    )
  }
}
