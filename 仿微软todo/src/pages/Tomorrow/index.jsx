import React from "react"
import TasksToolBar from "../../components/TasksToolBar"
import Tasks from "../../components/Tasks"

export default function Tomorrow() {
  return (
    <div className="show">
      <TasksToolBar mark={`tomorrow`} title={`ζζ₯εΎε`} />
      <Tasks mark={`tomorrow`} />
    </div>
  )
}
