import React, { Component } from "react"
import store from "../../redux/store"
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
} from "../../redux/count_action"

export default class Count extends Component {
  //加法
  increment = () => {
    const { value } = this.selectNumber
    store.dispatch(createIncrementAction(value * 1))
  }
  //减法
  decrement = () => {
    const { value } = this.selectNumber
    if (store.getState() === 0) return
    store.dispatch(createDecrementAction(value * 1))
  }
  //奇数加
  incrementIfOdd = () => {
    const { value } = this.selectNumber
    const count = store.getState()
    if (count % 2 !== 0) {
      store.dispatch(createIncrementAction(value * 1))
    }
  }
  //异步加（延迟加）
  incrementAsync = () => {
    const { value } = this.selectNumber
    store.dispatch(createIncrementAsyncAction(value * 1, 500))
  }

  render() {
    return (
      <div>
        <h2>当前求和为：{store.getState()}</h2>
        <select ref={c => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>
        &nbsp;
        <button onClick={this.decrement}>-</button>
        &nbsp;
        <button onClick={this.incrementIfOdd}>当前和为奇数再加</button>
        &nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
        &nbsp;
      </div>
    )
  }
}
