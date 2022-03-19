import React, { Component } from "react";
import Header from "./component/Header";

import "./App.css";
import List from "./component/List";
import Footer from "./component/Footer";

export default class App extends Component {
  //状态在哪里，操作状态的方法就在哪里

  state = {
    todos: [
      { id: "1", name: "吃饭", done: false },
      { id: "2", name: "睡觉", done: true },
      { id: "3", name: "写代码", done: false },
    ],
  };

  //添加一个todo，接收todo对象
  addTodo = (todoObj) => {
    //拿到原来的todos
    const { todos } = this.state;
    //新建一个todos
    const newTodos = [todoObj, ...todos];
    //修改state
    this.setState({ todos: newTodos });
  };

  //更新一个todo对象
  updateTodo = (id, done) => {
    const { todos } = this.state;

    //查找那个todo
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else return todoObj;
    });
    this.setState({ todos: newTodos });
  };

  //删除一个todo对象
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    this.setState({ todos: newTodos });
  };

  //全选todo对象
  checkAllTodo = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => {
      return { ...todoObj, done };
    });
    this.setState({ todos: newTodos });
  };

  //清除所有已完成
  clearAllDone = () => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => !todoObj.done);
    this.setState({ todos: newTodos });
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
