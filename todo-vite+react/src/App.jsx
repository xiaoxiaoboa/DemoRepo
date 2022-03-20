import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";

import "./App.css";

export default class App extends Component {
  state = {
    todos: [
      { id: 1, name: "吃饭", done: true },
      { id: 2, name: "睡觉", done: true },
      { id: 3, name: "写代码", done: false },
    ],
  };

  //添加一个todo
  addTodo = (todoObj) => {
    const { todos } = this.state;

    const newTodo = [todoObj, ...todos];
    this.setState({ todos: newTodo });
  };
  //更新一个todo
  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodo = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else {
        return todoObj;
      }
    });

    this.setState({ todos: newTodo });
  };
  //删除一个todo
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodo = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });

    this.setState({ todos: newTodo });
  };
  //全选
  checkAllTodo = (done) => {
    const { todos } = this.state;
    const newTodo = todos.map((todoObj) => {
      return { ...todoObj, done };
    });
    this.setState({ todos: newTodo });
  };
  //清除全部已完成
  clearAllDone = () => {
    const { todos } = this.state;
    const newTodo = todos.filter((todoObj) => !todoObj.done);
    this.setState({ todos: newTodo });
  };
  render() {
    const { todos } = this.state;
    return (
      <div className="box">
        <Header addTodo={this.addTodo} />
        <List
          todos={todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
        <Footer
          todos={todos}
          checkAllTodo={this.checkAllTodo}
          clearAllDone={this.clearAllDone}
        />
      </div>
    );
  }
}
