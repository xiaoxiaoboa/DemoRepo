import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import TaskList from "../../components/TaskList"

export default function OneDay() {
  return (
    <div className="show">
      <TasksToolBar mark={`oneday`} title={`我的一天`} />
      <TaskList mark={`oneday`} />
    </div>
  )
}
