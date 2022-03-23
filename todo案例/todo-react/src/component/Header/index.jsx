import React, { Component } from "react";
import PropTypes from 'prop-types'

import './index.css'

export default class Header extends Component {

  //对接收的props进行类型、必要性的限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  //键盘事件的回调
  handleKeyUp = (e) => {
    const {target, keyCode} = e
    if(keyCode !== 13) return

    if(target.value.trim() === '') return

    //str生成唯一ID，字符型
    const str = URL.createObjectURL(new Blob()).slice(-36);
    //生成新的todo对象
    const toDoObj = {id:str,name:target.value, done: false}
    this.props.addTodo(toDoObj);
    //清空输出框
    target.value = ''
  }

  

  render() {

    return (
      <div className="input">
        <input onKeyUp={this.handleKeyUp} className="text" type="text" placeholder="输入待办项，然后按下回车键"/>
      </div>
    )
  }
}
