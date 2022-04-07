import { INCREMENT,DECREMENT } from "../constant"

export const increment = value => ({
  type: INCREMENT,
  data: value
})
export const decrement = value => ({
  type: DECREMENT,
  data: value
})
