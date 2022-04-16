import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import TaskList from "../../components/TaskList"

export default function Tomorrow() {
  return (
    <div className="show">
      <TasksToolBar mark={`tomorrow`} title={`明日待办`} />
      <TaskList mark={`tomorrow`} />
    </div>
  )
}
