import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import {Task} from "../../components/Tasks"

export default function Important() {

  return (
    <div className="show">
      <TasksToolBar mark={`important`} title={`重要`} />
      <Task mark={`important`} />
    </div>
  )
}
