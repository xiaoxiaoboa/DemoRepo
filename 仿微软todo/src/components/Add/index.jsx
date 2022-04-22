import React from 'react'

export default function Add(props) {
  const {AddTask} = props
  return (
    <div className="AddTask">
      <div className="Add">
        <div className="Add-icon">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-round"></use>
          </svg>
        </div>
        <div className="Add-input">
          <input type="text" placeholder="添加任务" onKeyUp={AddTask} />
        </div>
      </div>
      <div className="AddFunc">
        <div className="remindme">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-tixing"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}
