import { atom } from "recoil"

const completed = atom({
  key: "completed",
  default: JSON.parse(localStorage.getItem("complated")) ?? []
})
export default completed