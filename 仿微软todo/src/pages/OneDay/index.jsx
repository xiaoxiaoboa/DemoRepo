import React from 'react'
import TasksToolBar from "../../components/TasksToolBar"
import TaskList from "../../components/TaskList"

export default function OneDay() {
  return (
    <div className='show'>
      <TasksToolBar title={`我的一天`}/>
      <TaskList/>
    </div>
  )
}
