import { atom } from "recoil"

const tasksState = atom({
  key: "tasks",
  default: JSON.parse(localStorage.getItem("All_tasks")) ?? {
    oneday: [],
    tomorrow: [],
    important: []
  }
})

export default tasksState
