import React,{useReducer} from 'react'

export default function useReducer模拟() {
  return (
    <div>useReducer模拟</div>
  )
}

const useSelectAction = ()=> {
  const [oneday, setOneday] = useReducer(reducer, init())
  const [tomorrow, setTomorrow] = useReducer(reducer, init())
  const [important, setImportant] = useReducer(reducer, init())
}
