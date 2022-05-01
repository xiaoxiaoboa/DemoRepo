import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import tasksState from "../../Recoil/tasks"
import { nanoid } from "nanoid"
import formatDate from "./getDate"
import Add from "../Add"
import List from "../List"

import "./index.css"

export default function Tasks(props) {
  // console.log('Task')
  const [tasks, setTask] = useRecoilState(tasksState)
  const { mark } = props

  /* 使用useEffect钩子，监控state，一旦改变就存储 */
  useEffect(() => {
    localStorage.setItem(`All_tasks`, JSON.stringify(tasks))
  }, [tasks])

  /* 处理用户输入的task，并更新useReducer */
  function addTask(e) {
    const { target, keyCode } = e
    /* 如果按下的按键不是回车键，或者输入的内容为空的话，不执行下步操作 */
    if (keyCode !== 13 || target.value.trim() === "") return

    /* 一个task对象 */
    const taskObj = {
      id: nanoid(),
      title: target.value,
      isComplated: false,
      isCollected: mark === "important" ? true : false,
      from: mark,
      date: formatDate()
    }
    /* mark === "oneday"
          ? "我的一天"
          : mark === "tomorrow"
          ? "明日待办"
          : "重要" */
    //更新state，传递一个对象，包含mark，和数据对象
    // setTask(increment({ mark, data: taskObj }))
    setTask({ ...tasks, [mark]: [taskObj, ...tasks[mark]] })

    /* 清空输入框 */
    target.value = ""
  }
  /* 拿到task对象id，进行删除 */
  function removeTask(id) {
    const newArr = tasks[mark].filter(task => {
      return task.id !== id
    })

    setTask({ ...tasks, [mark]: newArr })
  }

  /* 添加任务到重要和取消 */
  function addToImportant(id) {
    /* 取回localstorage里整个对象 */
    const currentTaskObj = JSON.parse(localStorage.getItem("All_tasks"))

    /* 遍历相应的数组 */
    currentTaskObj[mark].forEach(markValue => {
      /* 如果点击的那个task还没有被设为重要 */
      if (markValue.id === id && !markValue.isCollected) {
        /* 生成新ID */
        markValue.id = nanoid()

        /* 被设为重要 */
        markValue.isCollected = true

        /* 如果不在'重要'页面 */
        if (mark !== "important") {
          /* 给important数组开头添加,添加时要生成新ID */
          currentTaskObj[`important`].unshift({
            ...markValue,
            id: nanoid(),
            prevId: markValue.id
          })
        }

        /* 更新state */
        setTask(currentTaskObj)
        return
      } else if (markValue.id === id && markValue.isCollected) {
        /* 如果被点击的task已经被设为重要 ,就是要取消重要*/
        if (markValue.from === "important") return removeTask(id) 
        /* 先把'重要'界面的相应的task删除 */
        const newArr = currentTaskObj[`important`].filter(impValue => {
          return markValue.id !== impValue.prevId
        })
        currentTaskObj.important = newArr

        /* 取消点击task的那个页面的task的重要 */
        markValue.isCollected = false

        /* 如果取消重要时所在的位置是'重要'页面,并且这个tasks来自其他页面 */
        if (mark === "important" && markValue.from !== "important") {
          /* 从这个task所属页面找到它 */
          const prevObj = currentTaskObj[markValue.from].find(
            item => item.id === markValue.prevId
          )

          /* 取消重要 */
          prevObj.isCollected = false

          /* 删除'重要'页面这个task, 从'重要'页面find和点击的那个task的id相同id的task,然后删除,1表示只删除匹配到的第一个*/
          currentTaskObj[`important`].splice(
            currentTaskObj[`important`].findIndex(
              obj => obj.id === markValue.id
            ),
            1
          ) 
        }

        /* 更新state */
        setTask(currentTaskObj)
        return
      }
    })
  }
  return (
    <div className="taskcontainer">
      <Add AddTask={addTask} />
      <List
        tasks={tasks[mark]}
        removeTask={removeTask}
        addToImportant={addToImportant}
        mark={mark}
      />
    </div>
  )
}
