import React, { useReducer, useEffect } from "react"
import Add from '../Add'
import List from '../List'
import { nanoid } from "nanoid"
import "./index.css"

/* useReducer的reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return [action.data, ...state]
    case "decrement":
      return [
        state.filter(obj => {
          obj.id !== action.data.id
        })
      ]
    default:
      return state
  }
}

export  function Task(props) {
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
    const taskObj = { id: nanoid(), text: target.value, date: Date.now()}

    /* 更新对应mark的state， */
    selectAction({ mark, action: { type: "increment", data: taskObj } })
    /* 清空输入框 */
    target.value = ""
  }

  /* 声明props，统一传递 */
  const myProps = {
    AddTask: handleAddTask,
    item: selectAction({ mark })
    // handleDeleteShow
  }
  
  return <Render {...myProps} />
}

/* 渲染组件 */
function Render(props) {
  const { AddTask, item } = props
  return (
    <div className="taskcontainer">
      <Add AddTask={AddTask} />
      <List item={item}/>
    </div>
  )
}

