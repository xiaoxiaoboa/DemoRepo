import { FC, ReactElement, useContext, useState } from "react"
import CartItem from "./CartItem"
import "./index.css"
import { MyContext } from "../../context"
import { ACTION_TYPE } from "../../typings"

const CartList: FC = (): ReactElement => {
  const { cartItem, dispatch } = useContext(MyContext)

  return (
    <div className="cartList">
      {cartItem?.map(item => (
        <CartItem key={item.id} item={item} />
      ))}

      {cartItem.length < 1 ? (
        ""
      ) : (
        <div className="checkout">
          <div className="total">
            总金额：$
            {cartItem.reduce(
              (prev, curr) => prev + (curr.count as number) * curr.price,
              0
            )}
          </div>
          <div className="checkout_clear">
            <button className="clear_btn" onClick={() => dispatch({type: ACTION_TYPE.CLEARCART, payload: null})}>清空购物车</button>
            <button className="checkout_btn">结账</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartList
