import React, { Component } from "react";
import Item from "../Item";

import "./index.css";

export default class List extends Component {
  render() {
    const { todos, checkToDo, deleteToDo } = this.props;
    return (
      <ul className="list-box">
        {todos.map((todoObj) => {
          return (
            <Item
              key={todoObj.id}
              {...todoObj}
              checkToDo={checkToDo}
              deleteToDo={deleteToDo}
            />
          );
        })}
      </ul>
    );
  }
}
