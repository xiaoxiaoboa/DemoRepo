import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";

import "./App.css";

export default class App extends Component {
  state = {
    todos: [
      { id: 1, name: "吃饭", done: true },
      { id: 2, name: "睡觉", done: false },
      { id: 3, name: "写代码", done: false },
    ],
  };

  //添加一个todo
  addToDo = (todoObj) => {
    //获取state
    const { todos } = this.state;
    //拿到todo对象后，跟原来的todos合并
    const newToDos = [todoObj, ...todos];
    //更新state
    this.setState({ todos: newToDos });
  };
  //勾选todo
  checkToDo = (id, done) => {
    const { todos } = this.state;
    const newToDos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else return todoObj;
    });
    this.setState({ todos: newToDos });
  };
  //删除一个todo
  deleteToDo = (id) => {
    //拿到state中的todos
    const { todos } = this.state;
    //使用数组的filter方法，过滤出没有被删除的todo，组成新数组
    const newToDos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    //更新state
    this.setState({ todos: newToDos });
  };
  //勾选全部todo
  checkAllToDo = (done) => {
    //拿到state中的todos
    const { todos } = this.state;
    //使用map遍历数组，并把done的值合并进todo对象
    const newToDos = todos.map((todoObj) => {
      return { ...todoObj, done };
    });
    //更新state
    this.setState({ todos: newToDos });
  };
  //删除全部已完成
  deleteAllDone = () => {
    //拿到todos
    const { todos } = this.state;
    //过滤出done值为false的todo项
    const newToDos = todos.filter((todoObj) => !todoObj.done);
    if(newToDos.length === todos.length) return
    //更新state
    this.setState({todos: newToDos})
  };
  render() {
    const { todos } = this.state;

    return (
      <div className="box">
        <Header addToDo={this.addToDo} />
        <List
          todos={todos}
          checkToDo={this.checkToDo}
          deleteToDo={this.deleteToDo}
        />
        <Footer
          checkAllToDo={this.checkAllToDo}
          todos={todos}
          deleteAllDone={this.deleteAllDone}
        />
      </div>
    );
  }
}
