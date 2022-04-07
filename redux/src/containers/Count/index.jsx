import { connect } from "react-redux"
import { increment, decrement } from "../../redux/actions/count"
import React, { Component } from "react"

import "./index.css"

/* UI组件 */
class Count extends Component {
  increment = () => {
    const { increment } = this.props
    const { value } = this.selectedNumber
    increment(value * 1)
  }
  decrement = () => {
    const { decrement, sum } = this.props
    const { value } = this.selectedNumber
    if (sum === 0) return
    decrement(value * 1)
  }

  render() {
    const { sum,person } = this.props
    return (
      <div className="box">
        <h1>我是Count组件,下方总人数为：{person.length}</h1>
        <h2>{sum}</h2>
        <select ref={e => (this.selectedNumber = e)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>
        &nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}

/* 容器组件 */
//API层的简写方式：当需要传入mapDispatchToProps时，它可以是对象；另外mapDispatchToProps中的action可以不用dispatch来调用，react-redux会自动调用
export default connect(
  state => {
    const { sum, person } = state
    return { sum, person }
  },
  {
    increment,
    decrement
  }
)(Count)
