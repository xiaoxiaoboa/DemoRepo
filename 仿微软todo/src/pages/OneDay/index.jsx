import React, { useState } from "react"
import TasksToolBar from "../../components/TasksToolBar"
import Task from "../../components/Tasks"

export default function OneDay() {
  /* 初始化state，从localStorage中拿数据 */
  const [oneday, setOneday] = useState(
    JSON.parse(localStorage.getItem("task.oneday")) ?? []
  )
  return (
    <div className="show">
      <TasksToolBar mark={`oneday`} title={`我的一天`} />
      <Task tasks={oneday} setTask={setOneday} mark={`oneday`} />
    </div>
  )
}
