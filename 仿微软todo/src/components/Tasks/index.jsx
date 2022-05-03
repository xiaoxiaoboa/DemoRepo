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


  return (
    <div className="taskcontainer">
      <Add AddTask={e => addTask(e, tasks, setTask, mark)} />
      <List
        tasks={tasks[mark]}
        removeTask={id => removeTask(id, tasks, setTask, mark)}
        addToImportant={id => addToImportant(id, setTask, mark)}
        mark={mark}
        handleComplete={(id) => handleComplete(id, setTask, mark)}
      />
    </div>
  )
}
/* 处理用户输入的task，并更新useReducer */
function addTask(e, tasks, setTask, mark) {
  const { target, keyCode } = e
  /* 如果按下的按键不是回车键，或者输入的内容为空的话，不执行下步操作 */
  if (keyCode !== 13 || target.value.trim() === "") return
  /* 一个task对象 */
  const taskObj = {
    id: nanoid(),
    title: target.value,
    isCompleted: false,
    isCollected: mark === "important" ? true : false,
    from: mark,
    date: formatDate()
  }

  setTask({ ...tasks, [mark]: [taskObj, ...tasks[mark]] })

  /* 清空输入框 */
  target.value = ""
}

/* 拿到task对象id，进行删除 */
function removeTask(id, tasks, setTask, mark) {
  /* 查抄一下这个task有没有被设置为重要 */
  const isImportant = tasks[`important`].find(item => item.prevId === id)
  /* 把点击的那个task过滤掉 */
  const newArr = tasks[mark].filter(task => {
    return task.id !== id
  })
  /* 如果被设置了重要,就在'重要'页面也删除 */
  if (isImportant) {
    const newArr2 = tasks[`important`].filter(value => {
      return value.prevId !== id
    })
    setTask({ ...tasks, [mark]: newArr, [`important`]: newArr2 })
  } else {
    setTask({ ...tasks, [mark]: newArr })
  }
}

/* 添加任务到重要和取消 */
function addToImportant(id, setTask, mark) {
  /* 取回localstorage里整个对象 */
  const currentTaskObj = JSON.parse(localStorage.getItem("All_tasks"))

  /* 遍历相应的数组 */
  currentTaskObj[mark].forEach(markValue => {
    /* 设为重要 */
    if (markValue.id === id && !markValue.isCollected) {
      /* 更新state */
      setTask(notYetCollect(currentTaskObj, mark, markValue))
      return
    } else if (markValue.id === id && markValue.isCollected) {
      /* 取消重要 */

      setTask(collected(currentTaskObj, markValue, mark))
      return
    }
  })
}

/* 如果点击的那个task还没有被设为重要 -> 设为重要*/
function notYetCollect(currentTaskObj, mark, markValue) {
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
  return currentTaskObj
}

/* 如果点击的那个task已经被被设为重要 -> 取消重要*/
function collected(currentTaskObj, markValue, mark) {
  /* 取消重要时有三中情况: */

  /* 第一:在'重要'页面点击,并且点击的task也来自'重要' */
  if (markValue.from === "important" && mark === "important") {
    return filterTaskClicked(currentTaskObj, "important", markValue)
  } else if (markValue.from !== "important" && mark === "important") {
    /* 第二: 在'重要'页面点击,点击的task来自其他页面 */

    /* 从这个task所属页面找到它 */  
    const prevObj = currentTaskObj[markValue.from].find(
      item => item.id === markValue.prevId
    )
      console.log(prevObj)
    /* 取消重要 */
    prevObj.isCollected = false

    /* 取消重要后,'重要'页面也要删除它 */
    return filterTaskClicked(currentTaskObj, "important", markValue)
  } else {
    /* 第三: 在其他页面点击,点击的task也来自那个页面 */

    /* 取消点击的task的重要 */
    markValue.isCollected = false

    /* 取消重要后,'重要'页面也要删除它 */
    return filterTaskClicked(currentTaskObj, "important", markValue, true)
  }
}

/* 在原数组中过滤出要删除的task */
function filterTaskClicked(currentTaskObj, mark, markValue, otherPage) {
  const newArr = currentTaskObj[mark].filter(task => {
    /* 因为从其他页面删除'重要'中对应的task时,需要id相同,所以多一层判断 */
    return (otherPage ? task.prevId : task.id) !== markValue.id
  })
  /* 修改数组 */
  currentTaskObj[mark] = newArr
  return currentTaskObj
}



/* task完成 */
function handleComplete(id, setTask, mark) {
  const tasks = JSON.parse(localStorage.getItem('All_tasks'))
  const obj = tasks[mark].find(item => item.id === id)
  obj.isCompleted = !obj.isCompleted

  if(obj.hasOwnProperty('prevId')){
    const sourceObj = tasks[obj.from].find(item => item.id === obj.prevId)
    sourceObj.isCompleted = obj.isCompleted
  }else{
    const sourceObj = tasks[`important`].find(item => item.prevId === obj.id)
    if(sourceObj) sourceObj.isCompleted = obj.isCompleted
  }
  
  setTask(tasks)
}
