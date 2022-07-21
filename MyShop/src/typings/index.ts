export interface commodity {
  id: number
  img: string
  name: string
  price: number
  count?: number
  desc: string
}

export interface initRedcuer {
  cartItem: commodity[]
  isOpen: Boolean
  [propName: string]: any
}

export interface Action {
  type: ACTION_TYPE
  payload: commodity | Boolean | number
}

export enum ACTION_TYPE {
  ADDCART = "addCart",
  REMOVECART = "removeCart",
  TOGGLEOPEN = "toggleOpen",
  TOGGLECOUNT = "toggleCount",
  CLEARCART = "clearCart"
}
