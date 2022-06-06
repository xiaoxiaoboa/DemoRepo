import Topbar from "../../components/Topbar"
import PlayList from "../../components/PlayList"
import "./index.css"
import { SongsContext } from "../../context/SongsContext"
import { useContext } from "react"

export default function Main() {
  const { state } = useContext(SongsContext)
  return (
    <div className="maincontainer">
      <Topbar />
      <div className="bottomcontainer">
        <div className="bottomwrapper">{state.length > 0 && <PlayList />}</div>
      </div>
    </div>
  )
}
