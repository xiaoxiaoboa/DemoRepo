import { atom } from "recoil"

const uncompleted = atom({
  key: "uncompleted",
  default: JSON.parse(localStorage.getItem("uncompleted")) ?? []
})

export default uncompleted