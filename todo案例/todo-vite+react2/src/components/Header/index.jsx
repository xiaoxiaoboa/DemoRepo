import React, { Component } from 'react'
import {nanoid} from 'nanoid'

import './index.css'

export default class Header extends Component {


  //输入待办事件
  handleKeyUp = (e) => {
    //拿到App的传值
    const { addToDo } = this.props;
    
    const {target, keyCode} = e
    //按下的不是回车键或者输入框为空则返回
    if(keyCode !== 13 || target.value.trim() === '') return
    //生成唯一ID
    const toDoId = nanoid()
    //组成新的对象
    const newToDo = {id:toDoId,name:target.value,done:false}
    //传递给App组件
    addToDo(newToDo)
    //输入框置空
    target.value = ''
  }
  render() {
    return (
      <div className="input">
        <input
          type="text"
          className="text"
          placeholder="输入待办项，然后按下回车键"
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
