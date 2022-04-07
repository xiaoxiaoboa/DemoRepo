import React, { Component } from "react"
import { nanoid } from "nanoid"
import { connect } from "react-redux"
import { createAddPersonAction } from "../../redux/actions/person"

class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value
    const age = this.ageNode.value
    const { addPerson } = this.props
    if (name !== "" && age !== "") {
      addPerson({ id: nanoid(), name, age })
      this.nameNode.value = ""
      this.ageNode.value = ""
    }
  }

  render() {
    const { person, sum } = this.props

    return (
      <div>
        <h1>我是Person组件,上方组件求和为：{sum}</h1>
        <input
          ref={e => (this.nameNode = e)}
          type="text"
          placeholder="输入姓名"
        />
        &nbsp;
        <input
          ref={e => (this.ageNode = e)}
          type="text"
          placeholder="输入年龄"
        />
        &nbsp;
        <button onClick={this.addPerson}>提交</button>
        <ol>
          {person.map(personObj => {
            return (
              <li key={personObj.id}>
                {personObj.name}--{personObj.age}
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

export default connect(
  state => {
    const { person, sum } = state
    return { person, sum }
  },
  {
    addPerson: createAddPersonAction
  }
)(Person)
