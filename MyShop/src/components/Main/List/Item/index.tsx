import "./index.css"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { FC, ReactElement, useContext } from "react"
import { commodity, ACTION_TYPE } from "../../../../typings"
import { MyContext } from "../../../../context"

interface Props {
  commodity: commodity
}

const Item: FC<Props> = ({ commodity }): ReactElement => {
  const { dispatch } = useContext(MyContext)

  return (
    <div className="itemContainer">
      <div className="item">
        <img src={commodity.img} alt="" className="img" />

        <div className="name_price">
          <div className="name">{commodity.name}</div>
          <div className="price">${commodity.price}</div>
        </div>
        <div className="desc">{commodity.desc}</div>
        <div className="item_bottom">
          <div
            className="addcart"
            onClick={() =>
              dispatch({
                type: ACTION_TYPE.ADDCART,
                payload: { ...commodity, count: 1 }
              })
            }>
            <AddShoppingCartIcon sx={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
