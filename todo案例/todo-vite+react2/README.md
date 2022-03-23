---
title: todo案例
categories:
- - 计算机
  - React
date: 2022-03-23 18:09:43
---

[本案例来自B站尚硅谷React课程-张天禹](https://www.bilibili.com/video/BV1wy4y1D7JT?spm_id_from=333.999.0.0)

使用vite+react搭建脚手架

在src中建立components文件夹，存放子组件和组件样式；各个子组件使用各自单独的文件夹

# 初始化

1. 在App.jsx中初始化state，
   
   ```jsx
   state = {todos:[
     {id:1,name:'吃饭', done:true},
     {id:2,name:'睡觉', done:false},
     {id:3,name:'写代码', done:false}
   ]}
   ```

2. 在render中使用解构赋值，拿到state中的todos；通过props传递给List组件
   
    List使用解构赋值接收props的值，拿到的是一个数组
   
    在render中使用数组的map()方法遍历，每次返回一个<Item />，其中key使用todos中组值的ID；同时使用**展开语法**把todos中的每一组值都通过props传递过去
   
   ```jsx
   const {todos} = this.state //初始化state
   <List todos={todos}/> // 传递给List组件
   
   const { todos } = this.props; //List组件从props中接收
   return (    //在render方法中使用map()
     <ul className="list-box">
       {todos.map((todoObj) => {
         return <Item key={todoObj.id} {...todoObj}/>; //使用展开语法传递每个todo项
       })}
     </ul>
   );
   ```
   
    这时页面上已经初始化完成：
   
   ![Untitled](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/Untitled.1abelr51gmm8.webp)

# Header组件：【输入待办】功能

因为核心state在App中，所以遵循 **state在哪里，操作state的方法就在那里**

1. 在App组件中创建addToDo方法，用来操作state；通过props传递给Header组件，Header组件内在input元素上绑定onKeyUp事件，此事件调用一个Header组件实例对象的方法handleKeyUp,用来处理输入事件

2. 每个todo项都有一个id字段，这个字段不能重复；所以用到了一个ID字符生成器：[Nano ID](https://github.com/ai/nanoid)
   
   ```jsx
   //App.jsx组件
   //添加一个todo
   addToDo = (todoObj) => {
     //获取state
     const { todos } = this.state
     //拿到todo对象后，跟原来的todos合并
     const newToDos = [todoObj,...todos]
     //更新state
     this.setState({todos:newToDos})
   }
   <Header addToDo={this.addToDo} /> //传递props
   
   //Header.jsx组件
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
   onKeyUp={this.handleKeyUp} //键盘事件
   ```
   
    ![2022-03-23-04](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/2022-03-23-04.2hixu98aqhk0.gif)

# Item组件：【完成todo项目】

1. 在App.jsx组件内创建checkToDo方法，是属于App实例对象的方法；通过props中传递给List组件，然后在List组件内传递给Item组件
   
   ```jsx
   //App.jsx组件
   //勾选todo
   checkToDo = (id,done) => {
     const { todos } = this.state
     const newToDos = todos.map(todoObj => {
       if(todoObj.id === id) return {...todoObj,done}
       else return todoObj
     })
     this.setState({todos:newToDos})
   }
   <List todos={todos} checkToDo={this.checkToDo}/> //通过props传递
   
   //List组件
   return (
     <ul className="list-box">
       {todos.map((todoObj) => {
         return <Item key={todoObj.id} {...todoObj} checkToDo={checkToDo} />
       })}
     </ul>
   );
   ```

2. 在Item.jsx组件中创建handleCheckToDo方法，方法属于Item组件实例对象；方法内通过props接收到App传过来的checkToDo方法，来执行
   
    还需要在input元素上绑定事件onChange
   
   ```jsx
   //Item组件
   //处理勾选todo
   handleCheckToDo = (id) => {
     const { checkToDo } = this.props;
     return (e) => {
       const { checked } = e.target;
       checkToDo(id, checked);
     };
   };
   
   //绑定事件
   <input
     type="checkbox"
     checked={done}
     onChange={this.handleCheckToDo(id)}
   />
   ```
   
    运行时报错了
   
   ![Untitled-1](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/Untitled-1.ikhkwjau8g0.webp)
   
    后来发现绑定事件写错了🤣
   
   ![CF91E0B0-1878-453f-90BF-CD6C35E2F166](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/CF91E0B0-1878-453f-90BF-CD6C35E2F166.57yutym7pz40.webp)
   
    最后效果是：勾选一个tudo时，state里的数据也会随之改变
   
    ![2022-03-21-01](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/2022-03-21-01.1ezkyitgxgkg.gif)

# Item组件：【删除一个todo】

1. 在App组件内创建deleteToDo方法，此方法属于App组件实例对象；**方法中使用数组的filter方法，过滤出没有被删除的todo，组成新数组**；通过props传递此方法给List组件，接着List组件传递给Item组件
   
    Item组件中创建handleDelete方法，此方法属于Item组件实例对象；通过给按钮添加点击事件来执行此函数，同时要传递一个id
   
   ```jsx
   //App组件
   deleteToDo = (id) => {
     //拿到state中的todos
     const { todos } = this.state;
     //使用数组的filter方法，过滤出没有被删除的todo，组成新数组
     const newToDos = todos.filter((todoObj) => {
       return todoObj.id !== id;
     });
     //更新state
     this.setState({todos: newToDos})
   };
   
   //Item组件
   //删除一个todo
   handleDelete = (id) => {
     //从props中拿到deleteToDo
     const { deleteToDo } = this.props;
     return () => {
       //执行并传递要删除的todo的id
       deleteToDo(id);
     };
   };
   //通过点击事件来执行
   <button className="btn" onClick={this.handleDelete(id)}> 
   ```
   
    ![2022-03-23-01](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/2022-03-23-01.3uesc5q2vxq0.gif)

# Footer组件：【全选和计数】

1. 在App组件中创建checkAllToDo方法，此方法属于App组件实例对象；方法接收一个done参数，标志是否勾选；利用数组的map方法，把这个done的值合并进每个todo对象中
   
    把checkAllToDo方法传递给Footer组件，同时把state中的todos也传递过去
   
   ```jsx
   //App组件
   //勾选全部todo
   checkAllToDo = (done) => {
     //拿到state中的todos
     const { todos } = this.state;
     //使用map遍历数组，并把done的值合并进todo对象
     const newToDos = todos.map((todoObj) => {
       return { ...todoObj, done };
     });
     //更新state
     this.setState({todos: newToDos})
   };
   //传递给Footer组件
   <Footer checkAllToDo={this.checkAllToDo} todos={todos} />
   ```

2. 在Footer组件中，通过props接收checkAllToDo；创建handleCheckAll方法，接收一个参数，参数是input的checked；在input上绑定onChange事件来调用handleCheckAll
   
   ```jsx
   //Footer组件
   const { todos } = this.props; //接收todos
   //全选
   handleCheckAll = (e) => {
     //从props中拿到checkAllToDo
     const { checkAllToDo } = this.props;
     const { checked } = e.target;
     //执行checkAllToDo并传递checked
     checkAllToDo(checked);
   };
   //绑定onChange事件
   <input
     className="checkbox"
     type="checkbox"
     onChange={this.handleCheckAll}
     checked={countDone === allToDo && countDone !== 0 ? true : false}
   />
   ```

3. 通过props接收todos；全部todo的数量就是todos数组的长度；已完成todo的数量使用数组的reduce方法遍历数组，todo.done为true则是已完成，countDone结果就加上一
   
    当然，全选按钮和计数功能是相辅相成的；当全选时，计数中完成的数量就要等于全部todo的数量；当计数全部为0时，也就是没有了todo项，则全选按钮不应该被选中
   
    所以全选按钮的checked属性需要做判断来赋值；当countDone和allToDo相等并且countDone不等于0时，则全选按钮被选中，反之不被选中
   
   ```jsx
   //Footer组件
   const { todos } = this.props;
   //已完成的todo
   const countDone = todos.reduce(
     (previous, todo) => previous + (todo.done ? 1 : 0),
     0
   );
   //全部todo
   const allToDo = todos.length;
   //checked属性值的判断
   checked={countDone === allToDo && countDone !== 0 ? true : false}
   ```
   
    ![2022-03-23-02](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/2022-03-23-02.5xf9e6d7j3s0.gif)

# Footer组件：【清除全部已完成项】

1. 在App组件中创建deleteAllDone方法，此方法属于App组件实例对象；deleteAllDone中先拿到state中的todos，然后使用数组方法filter，过滤出done值为false的todo项，并生成新数组；如果新数组的长度和todos的长度一致，则表明没有已完成项，就return；否则更新state
   
    通过props传递给Footer组件
   
   ```jsx
   //App组件
   //删除全部已完成
   deleteAllDone = () => {
     //拿到todos
     const { todos } = this.state;
     //过滤出done值为false的todo项
     const newToDos = todos.filter((todoObj) => !todoObj.done);
     if(newToDos.length === todos.length) return
     //更新state
     this.setState({todos: newToDos})
   };
   //传递
   <Footer
     checkAllToDo={this.checkAllToDo}
     todos={todos}
     deleteAllDone={this.deleteAllDone}
   />
   ```

2. Footer组件中在button上绑定点击事件，触发handDeleteAllDone方法；该方法属于Footer实例对象；handDeleteAllDone触发从props中接收到的方法deleteAllDone
   
   ```jsx
   //Footer组件
   //删除全部已完成
   handDeleteAllDone = () => {
     const { deleteAllDone } = this.props;
     if(window.confirm('确定要删除全部已完成的项目么？')){
       deleteAllDone();
     }
   };
   //绑定事件
   <button className="btn-clear" onClick={this.handDeleteAllDone}>
   ```
   
    ![2022-03-23-03](https://cdn.jsdelivr.net/gh/xiaoxiaoboa/blog-pic@main/2022-03-23-03.455y44cukle0.gif)

😎todo案例完成 

[本案例来自B站尚硅谷React课程-张天禹](https://www.bilibili.com/video/BV1wy4y1D7JT?spm_id_from=333.999.0.0)
