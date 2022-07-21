import { initRedcuer, Action, ACTION_TYPE, commodity } from "../../typings"

export default function reducer(
  state: initRedcuer,
  action: Action
): initRedcuer {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPE.ADDCART:
      return {
        ...state,
        cartItem: [...state.cartItem, payload as commodity]
      }

    case ACTION_TYPE.REMOVECART:
      return {
        ...state,
        cartItem: state.cartItem.filter(item => item.id !== (payload as number))
      }

    case ACTION_TYPE.TOGGLECOUNT:
      return {
        ...state,
        cartItem: state.cartItem.map(item => {
          return item.id === (payload as commodity).id
            ? { ...item, ...(payload as commodity) }
            : item
        })
      }
    
    case ACTION_TYPE.CLEARCART:
      return {cartItem: [], isOpen: true}

    case ACTION_TYPE.TOGGLEOPEN:
      return {
        ...state,
        isOpen: payload as Boolean
      }

    default:
      return state
  }
}
