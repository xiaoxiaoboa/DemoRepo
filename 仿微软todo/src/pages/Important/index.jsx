import React, { useState } from "react"
import TasksToolBar from "../../components/TasksToolBar"
import  Task  from "../../components/Tasks"

export default function Important() {
  /* 初始化state，从localStorage中拿数据 */
  const [important, setImportant] = useState(
    JSON.parse(localStorage.getItem("task.important")) ?? []
  )



  return (
    <div className="show">
      <TasksToolBar mark={`important`} title={`重要`} />
      <Task tasks={important} setTask={setImportant} mark={`important`} />
    </div>
  )
}
