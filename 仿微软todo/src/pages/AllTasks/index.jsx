import React, { useRef, lazy, Suspense } from "react"
import { useRecoilValue } from "recoil"
import uncompleted from "../../Recoil/uncompleted"
import completed from "../../Recoil/completed"
import TasksToolBar from "../../components/TasksToolBar"
import "./index.css"

export default function AllTasks() {
  console.log("AllTasks")
  return (
    <div className="show">
      <TasksToolBar mark={`alltasks`} title={`任务`} />
      <hr />
      <ViewTasks />
    </div>
  )
}

function ViewTasks() {
  // console.log("ViewTasks")
  const uncompleted_task = useRecoilValue(uncompleted)
  const completed_task = useRecoilValue(completed)
  const myRef = useRef(null)

  /* 计算list最大高度 */
  function max_height() {
    const { current } = myRef
    return (
      document.body.clientHeight - current.offsetTop - current.clientHeight * 3
    )
  }

  /* 处理开启和收起抽屉的动作 */
  function handleClick(e) {
    myRef.current.focus()

    /* 控制箭头图标反转 */
    const arrowsNode = e.currentTarget.firstChild
    if (/unfold/.test(arrowsNode.classList)) {
      arrowsNode.classList.add("closed-icon")
      arrowsNode.classList.remove("unfold")
    } else {
      arrowsNode.classList.add("unfold")
      arrowsNode.classList.remove("closed-icon")
    }

    if (e.currentTarget.parentNode.lastChild.style.height === "") {
      /* 设置列表最大高度 */
      e.currentTarget.parentNode.lastChild.style.maxHeight = max_height() + "px"
      /* 设置列表高度 */
      e.currentTarget.parentNode.lastChild.style.height =
        e.currentTarget.lastChild.innerText * 43 + "px"
    } else {
      e.currentTarget.parentNode.lastChild.style.height = ""
    }
  }

  //#region reg
  // /* 把所有task合并到一个数组 */
  // function combineArr() {
  //   let newArr = []
  //   Object.values(tasks).forEach(value => {
  //     newArr = [...newArr, ...value]
  //   })
  //   return newArr
  // }
  // /* 过滤出未完成task */
  // function fliterUncomplated() {
  //   return combineArr().filter(value => {
  //     return value.isComplated === false
  //   })
  // }
  // /* 过滤出已完成task */
  // function fliterComplated() {
  //   return combineArr().filter(value => {
  //     return value.isComplated === true
  //   })
  // }
//#endregion
  return (
    <div className="drawertitleaskcontainer">
      <div className="uncomplated drawer">
        <div className="drawerheader" onClick={handleClick} ref={myRef}>
          <svg className="icon closed-icon" aria-hidden="true">
            <use xlinkHref="#icon-youjiantou_huaban"></use>
          </svg>
          <div className="drawertitle">未完成</div>
          <div className="uncomplatedCount">{0}</div>
        </div>
        <ShowList type={uncompleted_task} />
      </div>

      <div className="complated drawer">
        <div className="drawerheader" onClick={handleClick}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-youjiantou_huaban"></use>
          </svg>
          <div className="drawertitle">已完成</div>
          <div className="fliterComplatedCount">{0}</div>
        </div>
        <ShowList type={completed_task} />
      </div>

      <div className="timeout drawer">
        <div className="drawerheader" onClick={handleClick}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-youjiantou_huaban"></use>
          </svg>
          <div className="drawertitle">已过期</div>
        </div>
        {/* <ShowList /> */}
      </div>
    </div>
  )
}

function ShowList(props) {
  // console.log("ShowList")
  const { type } = props
  return (
    <div className="showlist">
      {type.map(taskObj => {
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
          </div>
        )
      })}
    </div>
  )
}