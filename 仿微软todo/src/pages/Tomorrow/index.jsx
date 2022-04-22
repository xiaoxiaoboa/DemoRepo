import React, { useState } from "react"
import TasksToolBar from "../../components/TasksToolBar"
import Task from "../../components/Tasks"

export default function Tomorrow() {
  /* 初始化state，从localStorage中拿数据 */
  const [tomorrow, setTomorrow] = useState(
    JSON.parse(localStorage.getItem("task.tomorrow")) ?? []
  )
  return (
    <div className="show">
      <TasksToolBar mark={`tomorrow`} title={`明日待办`} />
      <Task tasks={tomorrow} setTask={setTomorrow} mark={`tomorrow`} />
    </div>
  )
}
