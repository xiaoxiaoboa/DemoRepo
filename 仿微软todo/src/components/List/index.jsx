import React from 'react'

export default function List(props) {
  const {item} = props
  return (
    <div className="TaskList">
      {item.map(taskObj => {
        return (
          <div className="TaskItem" key={taskObj.id}>
            <div className="iscompleted">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-round-blue"></use>
              </svg>
            </div>
            <span className="task">{taskObj.text}</span>
            <div className="delete">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shanchu"></use>
              </svg>
            </div>
            <div className="iscollected">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shoucang"></use>
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}
