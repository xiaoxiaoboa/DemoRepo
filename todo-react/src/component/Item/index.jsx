import React, { Component } from "react";

import "./index.css";

export default class Item extends Component {
  state = { mouse: false };

  //鼠标是否移入回调
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };

  //是否勾选的回调
  handleCheck = (id) => {
    const { updateTodo } = this.props;
    return (e) => {
      const { checked } = e.target;
      updateTodo(id, checked);
    };
  };

  //删除按钮的回调
  handleDelete = (id) => {
    if(window.confirm('确定删除吗？')){
      this.props.deleteTodo(id)
    }
  }

  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state; //鼠标是否移入

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
          onClick={() => this.handleDelete(id)}
        >
          删除
        </button>
      </li>
    );
  }
}
