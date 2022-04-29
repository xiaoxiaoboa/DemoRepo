import React from "react"
import TasksToolBar from "../../components/TasksToolBar"

import Tasks from "../../components/Tasks"

export default function OneDay() {
  return (
    <div className="show">
      <TasksToolBar mark={`oneday`} title={`我的一天`} />
      <Tasks mark={`oneday`} />
    </div>
  )
}
