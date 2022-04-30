import React from "react"
import "./index.css"

export default function List(props) {
  const { tasks, removeTask, addToImportant } = props

  // console.log(tasks)
  return (
    <div className="TaskList">
      {tasks.map(taskObj => {
        return (
          <div className="TaskItem" key={taskObj.id}>
            <div className="iscompleted">
              <svg className="icon" aria-hidden="true">
                <use
                  xlinkHref={
                    taskObj.isComplated ? "#icon-wancheng" : "#icon-round-blue"
                  }></use>
              </svg>
            </div>
            <span className={taskObj.isComplated ? "task del-line" : "task"}>
              {taskObj.title}
            </span>
            <div className="delete" onClick={() => removeTask(taskObj.id)}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shanchu"></use>
              </svg>
            </div>
            <div
              className="iscollected"
              onClick={() => addToImportant(taskObj.id)}>
              <svg className="icon" aria-hidden="true">
                {/* <use xlinkHref="#icon-shoucang"></use> */}
                <use
                  xlinkHref={
                    taskObj.isCollected ? "#icon-shoucang1" : "#icon-shoucang"
                  }></use>
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}
