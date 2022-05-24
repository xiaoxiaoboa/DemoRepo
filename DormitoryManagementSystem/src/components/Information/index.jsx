import "./index.css"
import GetStudent from "../GetStudent"
import FunButton from "../FunButton"

export default function Information(props) {
  const { drom } = props
  return (
    <div className="informationcontainer">
      <div className="informationWrapper">
        <div className="header">
          <div className="headerTitle">
            <div className="dromName">{drom}住宿书院</div>
            <span>所有学生</span>
          </div>
          <div className="addInfo">
            <FunButton />
          </div>
        </div>
        <GetStudent />
      </div>
    </div>
  )
}
