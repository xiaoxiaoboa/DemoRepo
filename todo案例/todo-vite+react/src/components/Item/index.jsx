import React, { Component } from "react";

import "./index.css";

export default class Item extends Component {
  state = { mouse: false };
  //处理鼠标移入移出
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };
  //更新一个todo
  handleCheck = (id) => {
    const { updateTodo } = this.props;
    return (e) => {
      const { checked } = e.target;
      updateTodo(id, checked);
    };
  };
  //删除一个todo
  handleDelete = (id) => {
    const {deleteTodo} = this.props
    return () => {
      if(window.confirm("确定要删除么？")){
        deleteTodo(id)
      }
    }

  }
  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;
    return (
      <li
        className="item"
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <div>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleCheck(id)}
          />{" "}
          {name}
        </div>
        <button
          className="btn"
          style={{ display: mouse ? "block" : "none" }}
          onClick={this.handleDelete(id)}
        >
          删除
        </button>
      </li>
    );
  }
}
