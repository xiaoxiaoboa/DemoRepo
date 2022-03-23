import React, { Component } from "react";

import "./index.css";

export default class Item extends Component {
  //勾选一个todo
  handleCheckToDo = (id) => {
    const { checkToDo } = this.props;
    return (e) => {
      const { checked } = e.target;
      checkToDo(id, checked);
    };
  };
  //删除一个todo
  handleDelete = (id) => {
    //从props中拿到deleteToDo
    const { deleteToDo } = this.props;
    return () => {
      //执行并传递要删除的todo的id
      if (window.confirm("确定删除么？")) {
        deleteToDo(id);
      }
    };
  };
  render() {
    const { id, name, done } = this.props;
    return (
      <li className="item">
        <div>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleCheckToDo(id)}
          />
          {name}
        </div>
        <button className="btn" onClick={this.handleDelete(id)}>
          删除
        </button>
      </li>
    );
  }
}
