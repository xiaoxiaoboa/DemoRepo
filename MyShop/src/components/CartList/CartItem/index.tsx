import { FC, ReactElement, useContext } from "react"
import "./index.css"
import { commodity, ACTION_TYPE } from "../../../typings"
import { MyContext } from "../../../context"

interface IProps {
  item: commodity
}

const CartItem: FC<IProps> = ({ item }): ReactElement => {
  const { dispatch, cartItem } = useContext(MyContext)
  return (
    <div className="CartItemContainer">
      <div className="cartitem">
        <img src={item.img} alt="" className="cartImg" />

        <div className="cart_bootom">
          <div className="cart_name_price">
            <div className="cart_name">{item.name}</div>
            <div className="cart_price">${item.price * (item.count as number)}</div>
          </div>
          <div className="count_remove">
            <div className="counter">
              <div
                className="count_btn"
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPE.TOGGLECOUNT,
                    payload: { ...item, count: (item.count as number) + 1 }
                  })
                }>
                +
              </div>
              <span className="count_num">{item.count}</span>
              <div
                className="count_btn"
                onClick={() =>
                  item.count === 1
                    ? null
                    : dispatch({
                        type: ACTION_TYPE.TOGGLECOUNT,
                        payload: { ...item, count: (item.count as number) - 1 }
                      })
                }>
                -
              </div>
            </div>
            <button
              className="remove"
              onClick={() =>
                dispatch({
                  type: ACTION_TYPE.REMOVECART,
                  payload: item.id
                })
              }>
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
