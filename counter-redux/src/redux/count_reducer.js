import {INCREMENT,DECREMENT} from './constant'

//初始化返回值
const initState = 0
//设置默认参数
export default function countReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case INCREMENT:
      return preState + data
    case DECREMENT:
      return preState - data
    default:
      return preState
  }
}
