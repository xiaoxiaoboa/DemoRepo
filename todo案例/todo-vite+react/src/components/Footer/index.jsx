import React, { Component } from "react";

import "./index.css";

export default class Footer extends Component {
  //全选
  handleCheckAll = (e) => {
    const { checked } = e.target;
    const { checkAllTodo } = this.props;
    checkAllTodo(checked);
  };
  //清除全部已完成
  handleClearAllDone = () => {
    const {clearAllDone} = this.props
    if(window.confirm("确定清除全部已完成么？")){
      clearAllDone();
    }
  }
  render() {
    const { todos } = this.props;
    //已完成数量
    const doneCount = todos.reduce((previous, todo) => {
      return previous + (todo.done ? 1 : 0);
    }, 0);
    //全部数量
    const count = todos.length;
    return (
      <div className="footer-box">
        <div>
          <input
            type="checkbox"
            className="checkbox"
            checked={doneCount === count && count !== 0 ? true : false}
            onChange={this.handleCheckAll}
          />
          全选
        </div>
        <span className="count">
          已完成 {doneCount} / 全部 {count}
        </span>
        <button className="btn-clear" onClick={this.handleClearAllDone}>
          清除全部已完成
        </button>
      </div>
    );
  }
}
