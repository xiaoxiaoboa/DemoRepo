import React, { Component } from "react";

import "./index.css";

export default class Footer extends Component {
  handleCheckAll = (e) => {
    this.props.checkAllTodo(e.target.checked);
  };
  handleClearAll = () => {
    if(window.confirm('确定要清除所有已完成么？')){
      this.props.clearAllDone();
    }
  };

  render() {
    const { todos } = this.props;
    //已完成的todo
    const doneCount = todos.reduce(
      (previous, todo) => previous + (todo.done ? 1 : 0),
      0
    );
    //全部todo的数量
    const total = todos.length;
    return (
      <div className="footer-box">
        <div>
          <input
            className="checkbox"
            type="checkbox"
            onChange={this.handleCheckAll}
            checked={doneCount === total && total !== 0 ? true : false}
          />{" "}
          全选
        </div>
        <span className="count">
          已完成 {doneCount} / 全部 {total}
        </span>
        <button className="btn-clear" onClick={this.handleClearAll}>
          清除所有已完成
        </button>
      </div>
    );
  }
}
