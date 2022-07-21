import { FC, ReactElement } from "react"
import Main from "../../components/Main"
import TopBar from "../../components/TopBar"

const Home: FC = (): ReactElement => {
  return (
    <div>
      <TopBar />
      <Main />
    </div>
  )
}

export default Home
