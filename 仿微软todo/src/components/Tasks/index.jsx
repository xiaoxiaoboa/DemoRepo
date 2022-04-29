import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import tasksState from "../../Recoil/tasks"
import { nanoid } from "nanoid"
import formatDate from "./getDate"
import Add from "../Add"
import List from "../List"

import "./index.css"

export default function Tasks(props) {
  // console.log('Task')
  const [tasks, setTask] = useRecoilState(tasksState)
  const { mark } = props

  /* 使用useEffect钩子，监控state，一旦改变就存储 */
  useEffect(() => {
    localStorage.setItem(`All_tasks`, JSON.stringify(tasks))
  }, [tasks])

  /* 处理用户输入的task，并更新useReducer */
  function AddTask(e) {
    const { target, keyCode } = e
    /* 如果按下的按键不是回车键，或者输入的内容为空的话，不执行下步操作 */
    if (keyCode !== 13 || target.value.trim() === "") return

    /* 一个task对象 */
    const taskObj = { id: nanoid(), title: target.value, isComplated: true, date: formatDate() }

    //更新state，传递一个对象，包含mark，和数据对象
    // setTask(increment({ mark, data: taskObj }))
    setTask({ ...tasks, [mark]: [taskObj, ...tasks[mark]] })

    /* 清空输入框 */
    target.value = ""
  }
  /* 拿到task对象id，进行删除 */
  function RemoveTask(id) {
    const newArr = tasks[mark].filter(task => {
      return task.id !== id
    })
    setTask({ ...tasks, [mark]: newArr })
  }
  return (
    <div className="taskcontainer">
      <Add AddTask={AddTask} />
      <List tasks={tasks[mark]} RemoveTask={RemoveTask} />
    </div>
  )
}
