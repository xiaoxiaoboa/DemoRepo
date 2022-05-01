import React from "react"
import "./index.css"

export default function List(props) {
  const { tasks, removeTask, addToImportant,mark } = props
  // console.log('List')

  function selectFrom(from){
    switch (from) {
      case 'oneday':
        return "来自: 『我的一天』"
      case 'tomorrow':
        return "来自: 『明日待办』"
      case 'important':
        return "来自: 『重要』"
                                  
      default:
        return "来自: 『 』"
    }
  }
  return (
    <div className="TaskList">
      {tasks.map(taskObj => {
        return (
          <div className="TaskItem" key={taskObj.id} title={selectFrom(taskObj.from)}>
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
              className="iscollected"
              onClick={() => addToImportant(taskObj.id)}>
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
