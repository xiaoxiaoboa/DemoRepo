import React, { useState } from "react"
import {nanoid} from "nanoid"
import "./index.css"

export default function TaskList(props) {
  /* 接收props，mark标志了是谁正在使用这个组件 （important | oneday | tomorrow */
  const { mark } = props

  /* 初始化useState，管理tasks数据 */
  const [task, setTask] = useState({
    oneday: []
  })

  /* 处理用户输入的tsak，并更新state */
  function AddTask(e) {
    const { target, keyCode } = e

    /* 如果按下的按键不是回车键，或者输入的内容为空的话，不执行下步操作 */
    if (keyCode !== 13 || target.value.trim() === "") return

    /* 一个task数组 */
    const taskObj = { id: nanoid(), text: target.value }

    /* 更新对应mark的state， */
    setTask({ [mark]: [taskObj, ...task[mark]] })

    /* 清空输入框 */
    target.value = ""

    /* 存入localStorage */
  }
  return (
    <div className="taskcontainer">
      <div className="AddTask">
        <div className="Add">
          <div className="Add-icon">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-round"></use>
            </svg>
          </div>
          <div className="Add-input">
            <input type="text" placeholder="添加任务" onKeyUp={AddTask} />
          </div>
        </div>
        <div className="AddFunc">
          <div className="remindme">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-tixing"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="TaskList">
        {task.oneday.map(taskObj => {
          return (
            <div className="TaskItem" key={taskObj.id}>
              <div className="iscompleted">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-round-blue"></use>
                </svg>
              </div>
              <span className="task">{taskObj.text}</span>
              <div className="iscollected">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-shoucang"></use>
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
