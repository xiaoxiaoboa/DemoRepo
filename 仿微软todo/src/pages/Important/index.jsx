import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import TaskList from "../../components/TaskList"

export default function Important() {
  return (
    <div className="show">
      <TasksToolBar mark={`important`} title={`重要`} />
      <TaskList mark={`important`} />
    </div>
  )
}
