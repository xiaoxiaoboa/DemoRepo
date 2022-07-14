import { atom } from "recoil"

export const clickedItemState = atom({
  key: "clickedItem",
  default: null
})

export const timerValueState = atom({
  key: "timerValue",
  default: 0
})

export const timerOnState = atom({
  key: "timerOn",
  default: false
})
