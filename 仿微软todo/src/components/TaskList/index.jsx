import React, { useReducer, useEffect } from "react"
import { nanoid } from "nanoid"
import "./index.css"
// import Test from "./useReducer模拟"

/* useReducer的reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return [...state, action.data]
    case "decrement":
      const newArr = state.filter(obj => {
        obj.id !== action.data.id
      })
      return newArr
    default:
      return state
  }
}
export default function TaskList(props) {
  /* 接收props，mark标志了是谁正在使用这个组件 （important | oneday | tomorrow */
  const { mark } = props

  /* 初始化useReducer，管理tasks数据 */
  const [oneday, setOneday] = useReducer(reducer, init())
  const [tomorrow, setTomorrow] = useReducer(reducer, init())
  const [important, setImportant] = useReducer(reducer, init())

  /* 使用useEffect钩子，监控这三个模块的state，一旦改变就 */
  useEffect(() => {
    localStorage.setItem(
      "task" + `.${mark}`,
      JSON.stringify(selectAction({ mark }))
    )
  }, [oneday, tomorrow, important])

  function selectAction(target) {
    /* 选择出使用哪个action 
    target: {
        mark,
        action: { type: "increment", data: { id: 1, text: "hello" } }
      }
  */
    const { mark, action } = target
    switch (mark) {
      case "oneday":
        return action ? setOneday(action) : oneday
      case "tomorrow":
        return action ? setTomorrow(action) : tomorrow
      case "important":
        return action ? setImportant(action) : important
      default:
        break
    }
  }

  /* 初始化useReducer */
  function init() {
    return JSON.parse(localStorage.getItem("task" + `.${mark}`)) ?? []
  }

  /* 处理用户输入的task，并更新useReducer */
  function handleAddTask(e) {
    const { target, keyCode } = e
    /* 如果按下的按键不是回车键，或者输入的内容为空的话，不执行下步操作 */
    if (keyCode !== 13 || target.value.trim() === "") return

    /* 一个task对象 */
    const taskObj = { id: nanoid(), text: target.value }

    /* 更新对应mark的state， */
    selectAction({ mark, action: { type: "increment", data: taskObj } })
    /* 清空输入框 */
    target.value = ""

    /* 先把taskObj推入数组再存入localStorage */
    // localStorage.setItem("task" + `.${mark}`, JSON.stringify(TaskArr))
  }

  return <Render AddTask={handleAddTask} item={selectAction({ mark })} />
}

/* 渲染组件 */
function Render(props) {
  const { AddTask, item } = props
  return (
    <div className="taskcontainer">
      {/* <Test /> */}
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
              <div className="iscollected">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-shoucang"></use>
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
