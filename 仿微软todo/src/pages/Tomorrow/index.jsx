import React from "react"
import TasksToolBar from "../../components/TasksToolBar"
import Tasks from "../../components/Tasks"

export default function Tomorrow() {
  return (
    <div className="show">
      <TasksToolBar mark={`tomorrow`} title={`明日待办`} />
      <Tasks mark={`tomorrow`} />
    </div>
  )
}
