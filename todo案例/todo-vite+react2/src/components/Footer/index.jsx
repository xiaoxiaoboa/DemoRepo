import React, { Component } from "react";

import "./index.css";

export default class Footer extends Component {
  //全选
  handleCheckAll = (e) => {
    //从props中拿到checkAllToDo
    const { checkAllToDo } = this.props;
    const { checked } = e.target;
    //执行checkAllToDo并传递checked
    checkAllToDo(checked);
  };
  //删除全部已完成
  handDeleteAllDone = () => {
    const { deleteAllDone } = this.props;
    if(window.confirm('确定要删除全部已完成的项目么？')){
      deleteAllDone();
    }
  };

  render() {
    const { todos } = this.props;
    //已完成的todo
    const countDone = todos.reduce(
      (previous, todo) => previous + (todo.done ? 1 : 0),
      0
    );
    //全部todo
    const allToDo = todos.length;

    return (
      <div className="footer-box">
        <div>
          <input
            className="checkbox"
            type="checkbox"
            onChange={this.handleCheckAll}
            checked={countDone === allToDo && countDone !== 0 ? true : false}
          />
        </div>
        <span className="count">
          已完成 {countDone} / 全部 {allToDo}
        </span>
        <button className="btn-clear" onClick={this.handDeleteAllDone}>
          清除全部已完成
        </button>
      </div>
    );
  }
}
