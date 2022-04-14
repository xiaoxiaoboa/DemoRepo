import React from "react"
import "./index.css"

export default function TasksToolBar(props) {
  const {title} = props
  return (
    <div className="toolbar">
      <div className="title-tool">
        <div className="title-container">
          <h2>{title}</h2>
        </div>
        <div className="tool-container">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-paixu"></use>
          </svg>
          <span className="sort">排序</span>
        </div>
      </div>
    </div>
  )
}
