import React, { Component } from "react"
import { withRouter } from "react-router-dom"

class Test extends Component {
  render() {
    // console.log(this.props)
    // console.log("Test渲染了")
    return <div>Test</div>
  }
}
export default withRouter(Test)
