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
      flag: null,
      title: target.value,
      isComplated: false,
      isCollected: false,
      date: formatDate()
    }

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
  /* 添加任务到重要 */
  function addToImportant(id) {
    /* 新的task对象 */
    let newObj
    /* 旧的task对象 */
    let oldObj
    /* 新tasks数组 */
    let newArr
    /* 记录就对象的ID */
    let flag

    tasks[mark].forEach(task => {
      /* 找出点击的那个task,若没有被设为重要就设为重要 */
      if (task.id === id && !task.isCollected) {
        /* 新建一个task,只改变了id,因为设为重要后,对象内的isCollected字段需要修改 */
        oldObj = createObj(task)
        /* 新的task对象,需要添加到important,对象中额外保存了旧对象的ID,在取消重要时使用 */
        newObj = createObj(task, oldObj.id)
        /* 删除所在界面点击的那个task,并生成新的task对象和新的数组,重新设置state */
        newArr = tasks[mark].filter(task => {
          return task.id !== id
        })
        /* 设置state */
        setTask({
          ...tasks,
          [`important`]: [newObj, ...tasks[`important`]],
          [mark]: [oldObj, ...newArr]
        })
      }
      /* 若被设为重要,就取消重要 */
      if (task.isCollected) {
        /* 找到那个旧ID相同的task,删除并生成新的数组 */
        const newArr = tasks[`important`].filter(task => {
          return task.flagId === id
        })
        /* 设置新的数组时,还要将本界面的task重新设置,因为图标需要变化 */
        if (newArr.length < 1) return
        setTask({
          ...tasks,
          [`important`]: newArr,
          [mark]: [createObj(task), ...newArr]
        })
      }
    })

    /* 生成所需的对应的对象 */
    function createObj(task, flagId) {
      const obj = {
        id: nanoid(),
        flag: flagId ? flagId : null,
        title: task.title,
        isComplated: task.isComplated,
        isCollected: task.isCollected ? !task.isCollected : true,
        date: task.date
      }
      flag = obj.id
      return obj
    }
  }

  return (
    <div className="taskcontainer">
      <Add AddTask={addTask} />
      <List
        tasks={tasks[mark]}
        removeTask={removeTask}
        addToImportant={addToImportant}
      />
    </div>
  )
}
