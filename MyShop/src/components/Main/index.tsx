import List from "./List"
import "./index.css"
import Cart from "../../pages/Cart"
import { MyContext } from "../../context"
import { useContext } from "react"

const Main = () => {
  const { isOpen } = useContext(MyContext)
  return <div className="mainContainer">{isOpen ? <Cart /> : <List />}</div>
}

export default Main
