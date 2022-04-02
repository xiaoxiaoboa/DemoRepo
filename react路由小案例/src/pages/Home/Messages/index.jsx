import React, { Component } from "react"
import Detail from "./Detail"
import { Link, Route } from "react-router-dom"

export default class Messages extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to={`/home/messages/detail/1`}>post1</Link>
          </li>
          <li>
            <Link to={`/home/messages/detail/2`}>post2</Link>
          </li>
          <li>
            <Link to={`/home/messages/detail/3`}>post3</Link>
          </li>
        </ul>
        <div className="placeholder2-home"></div>
        <hr />
        <div className="placeholder2-home"></div>
        <Route path="/home/messages/detail/:id/" component={Detail} />
      </div>
    )
  }
}
