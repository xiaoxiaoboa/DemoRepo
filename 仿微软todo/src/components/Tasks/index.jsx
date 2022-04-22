import React, { useEffect } from "react"
import Add from "../Add"
import List from "../List"
import { nanoid } from "nanoid"
import formatDate from "./getDate"
import "./index.css"

export default function Task(props) {
  /* 接收props，mark标志了是谁正在使用这个组件 （important | oneday | tomorrow 
    tasks和setTask，是父组件传来的useState属性
  */
  const { tasks, setTask, mark } = props

  /* 使用useEffect钩子，监控state，一旦改变就存储 */
  useEffect(() => {
    localStorage.setItem("task" + `.${mark}`, JSON.stringify(tasks))
  }, [tasks])

  /* 处理用户输入的task，并更新useReducer */
  function handleAddTask(e) {
    const { target, keyCode } = e
    /* 如果按下的按键不是回车键，或者输入的内容为空的话，不执行下步操作 */
    if (keyCode !== 13 || target.value.trim() === "") return

    /* 一个task对象 */
    const taskObj = { id: nanoid(), title: target.value, date: formatDate() }

    /* 更新对应mark的state， */
    // selectAction({ mark, action: { type: "increment", data: taskObj } })
    setTask([taskObj, ...tasks])
    /* 清空输入框 */
    target.value = ""
  }


  return (
    <div className="taskcontainer">
      <Add AddTask={handleAddTask} />
      <List tasks={tasks} />
    </div>
  )
}

