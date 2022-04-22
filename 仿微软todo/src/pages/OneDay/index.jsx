import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import {Task} from "../../components/Tasks"

export default function OneDay() {
  return (
    <div className="show">
      <TasksToolBar mark={`oneday`} title={`我的一天`} />
      <Task mark={`oneday`} />
    </div>
  )
}
