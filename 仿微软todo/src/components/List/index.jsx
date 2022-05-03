import React from "react"
import "./index.css"

export default function List(props) {
  const { tasks, removeTask, addToImportant, mark, handleComplete } = props
  // console.log('List')

  function selectFrom(from) {
    switch (from) {
      case "oneday":
        return "来自: 『我的一天』"
      case "tomorrow":
        return "来自: 『明日待办』"
      case "important":
        return "来自: 『重要』"

      default:
        return "来自: 『 』"
    }
  }
  return (
    <div className="TaskList">
      {tasks.map(taskObj => {
        return (
          <div
            className="TaskItem"
            key={taskObj.id}
            title={selectFrom(taskObj.from)}>
            <div className="iscompleted">
              <svg
                className="icon"
                aria-hidden="true"
                onClick={() => handleComplete(taskObj.id)}>
                <use
                  xlinkHref={
                    taskObj.isCompleted ? "#icon-wancheng" : "#icon-round-blue"
                  }></use>
              </svg>
            </div>
            <span className={taskObj.isCompleted ? "task del-line" : "task"}>
              {taskObj.title}
            </span>
            {mark === "important" ? (
              <></>
            ) : (
              <div className="delete" onClick={() => removeTask(taskObj.id)}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-shanchu"></use>
                </svg>
              </div>
            )}

            <div
              className={
                taskObj.isCompleted ? "iscollected disabled" : "iscollected"
              }
              onClick={e => {
                taskObj.isCompleted
                  ? e.preventDefault
                  : addToImportant(taskObj.id)
              }}
              title={taskObj.isCompleted ? "已完成,不能使用此项!" : ""}>
              <svg className="icon" aria-hidden="true">
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
