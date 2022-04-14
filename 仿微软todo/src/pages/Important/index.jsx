import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import TaskList from "../../components/TaskList"

export default function Important() {
  return (
    <div className='show'>
      <TasksToolBar title={`重要`}/>
      <TaskList/>
    </div>
  )
}
