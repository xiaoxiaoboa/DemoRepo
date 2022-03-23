import React, { Component } from "react";
import { nanoid } from "nanoid";

import "./index.css";

export default class Header extends Component {
  //添加一个todo
  handleKeyUp = (e) => {
    const { addTodo } = this.props;
    const { keyCode, target } = e;
    if (keyCode !== 13 || target.value.trim() === "") return;

    //生成唯一ID
    const toDoId = nanoid();

    //新的todo对象
    const newTodo = { id: toDoId, name: target.value, done: false };

    //传递给App组件
    addTodo(newTodo);

    //清空输入框
    target.value = "";
  };

  render() {
    return (
      <div className="input">
        <input
          type="text"
          className="text"
          placeholder="输入待办项，然后按下回车键"
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
