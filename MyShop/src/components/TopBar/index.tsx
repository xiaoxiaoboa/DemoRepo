import { FC, ReactElement, useContext } from "react"
import "./index.css"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { MyContext } from "../../context"
import { ACTION_TYPE } from "../../typings"

const TopBar: FC = (): ReactElement => {
  const { dispatch, isOpen, cartItem } = useContext(MyContext)

  return (
    <div className="topbarContainer">
      <div className="topbar">
        <div className="logo">
          <img
            src="https://commerce-js.netlify.app/static/media/commerce.422fec10.png"
            className="logoImg"
          />
          <span className="title">React Shop</span>
        </div>
        <div
          className="cart"
          onClick={() =>
            dispatch({
              type: ACTION_TYPE.TOGGLEOPEN,
              payload: !isOpen
            })
          }>
          <ShoppingCartIcon sx={{ cursor: "pointer" }} />
          <div className="promptCount" style={{ display: cartItem.length > 0 ? "flex" : "none" }}>
            {cartItem.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
