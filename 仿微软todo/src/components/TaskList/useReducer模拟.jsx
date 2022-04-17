import React, { useReducer } from "react"

const initialState = []
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return [...state, action.data]
    case "decrement":
      const newArr = state.filter(obj => {
        obj.id !== action.data.id
      })
      return newArr
    default:
      return state
  }
}
/* {
    'oneday': [
        {},
        {},
        {}
    ]
} */
function selectAction(target) {
  switch (target.mark) {
    case "oneday":
      props.setOneday(target.action)
      return

    default:
      break
  }
}
export default function Untitled() {
  const [oneday, setOneday] = useReducer(reducer, initialState)
  const [tomorrow, setTomorrow] = useReducer(reducer, initialState)
  const [important, setImportant] = useReducer(reducer, initialState)
  const mark = "oneday"
  function handel() {
    // setOneday({ type: "increment", data: { id: 1, text: "hello" } })
    
    // selectAction({
    //     mark,
    //     action: { type: "increment", data: { id: 1, text: "hello" } }
    //   })
  }

  function handel2() {
    dispatch({
      mark: "oneday",
      type: "decrement",
      data: { id: 1 }
    })
  }
  return (
    <div>
      <button onClick={handel}>点击</button>
      <button onClick={handel2}>点击2</button>
    </div>
  )
}


