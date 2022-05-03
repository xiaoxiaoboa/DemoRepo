import { selector } from "recoil"
import tasksState from "../tasks"

const tasksSelector = selector({
  key: "tasksSelector",
  get: ({ get }) => {
    const all_tasks = get(tasksState)
    let unCompleted = []
    let completed = []
    for (let item in all_tasks) {
      const newArr1 = all_tasks[item].filter(value => !value.isCompleted )
      const newArr2 = all_tasks[item].filter(value => value.isCompleted )
      unCompleted.push(...newArr1)
      completed.push(...newArr2)
    }
    console.log()
    return {
      unCompleted: filterRepeat(unCompleted),
      completed: filterRepeat(completed)
    }
  }
})

export default tasksSelector

function filterRepeat(arr){
  const newArr = arr.filter(item => !item.hasOwnProperty('prevId'))
  return newArr
}