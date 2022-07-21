import { FC, ReactElement, useEffect, useState } from "react"
import "./index.css"
import Item from "./Item"
import { commodity } from "../../../typings"

const List: FC = (): ReactElement => {
  const [commodity, setCommodity] = useState<commodity[]>()

  const commodities: commodity[] = [
    {
      id: 1,
      img: "https://cdn.chec.io/merchants/19661/assets/tv2wubQUhhbW1qAl|Screenshot 2020-11-25 at 10.56.41.png",
      name: "Kettle",
      price: 45.5,
      desc: "Black stove-top kettle"
    },
    {
      id: 2,
      img: "https://cdn.chec.io/merchants/19661/assets/YRVZPLtp0ascAs1G|Screenshot 2020-11-25 at 10.57.49.png",
      name: "Book",
      price: 13.5,
      desc: "Book on grid systems"
    },
    {
      id: 3,
      img: "https://cdn.chec.io/merchants/19661/assets/HLByCJoJDfQHRtuH|Screenshot 2020-11-25 at 10.58.24.png",
      name: "Coffee",
      price: 7.5,
      desc: "Whole bean espresso can"
    },
    {
      id: 4,
      img: "https://cdn.chec.io/merchants/19661/assets/AtrQpmVYbw9jwdf7|Screenshot 2020-11-25 at 10.59.19.png",
      name: "Lamp",
      price: 90.0,
      desc: "Wooden table lamp"
    },
    {
      id: 5,
      img: "https://cdn.chec.io/merchants/19661/assets/NwVTaC1cAey9qtaj|Screenshot 2020-11-25 at 10.59.48.png",
      name: "HeadPhones",
      price: 60.0,
      desc: "Seafoam wireless headphones"
    },
    {
      id: 6,
      img: "https://cdn.chec.io/merchants/19661/assets/WGkKDasZr7W5RVC2|Screenshot 2020-11-25 at 11.00.11.png",
      name: "Messenger bag",
      price: 80.0,
      desc: "Black roll-top backpack"
    },
    {
      id: 7,
      img: "https://cdn.chec.io/merchants/19661/assets/H4khxFAmm8BOxSOZ|Screenshot 2020-11-25 at 11.00.51.png",
      name: "Keyboard",
      price: 65.0,
      desc: "Black magic keyboard"
    },
    {
      id: 8,
      img: "https://cdn.chec.io/merchants/19661/assets/VFgCKovPcmNWYm4G|Screenshot 2020-11-25 at 11.01.24.png",
      name: "Mouse",
      price: 50.0,
      desc: "Black magic mouse"
    }
  ]

  useEffect(() => {
    setCommodity(commodities)
  }, [])

  return (
    <div className="listContainer">
      {commodity?.map(item => {
        return <Item key={item.id} commodity={item} />
      })}
    </div>
  )
}

export default List
