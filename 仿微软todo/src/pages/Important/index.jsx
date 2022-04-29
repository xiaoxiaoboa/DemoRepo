import React from "react"
import TasksToolBar from "../../components/TasksToolBar"
import Tasks from "../../components/Tasks"

export default function Important() {
  return (
    <div className="show">
      <TasksToolBar mark={`important`} title={`重要`} />
      <Tasks mark={`important`} />
    </div>
  )
}
