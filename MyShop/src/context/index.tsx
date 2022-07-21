import { createContext, FC, ReactElement, useReducer } from "react"
import { commodity, initRedcuer } from "../typings"
import reducer from "../components/redcuer"

function init(initRedcuer: initRedcuer): initRedcuer {
  return {
    cartItem: initRedcuer.cartItem,
    isOpen: initRedcuer.isOpen
  }
}

export const MyContext = createContext<initRedcuer>({
  cartItem: [],
  isOpen: false
})

export const MyContextProvider: FC<any> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(
    reducer,
    { cartItem: [], isOpen: false },
    init
  )

  return (
    <MyContext.Provider
      value={{
        cartItem: state.cartItem,
        isOpen: state.isOpen,
        dispatch
      }}>
      {children}
    </MyContext.Provider>
  )
}
