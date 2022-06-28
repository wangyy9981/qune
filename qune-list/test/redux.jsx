//分别用三个文件actions.js,reducers.js,store.js来定义action,reducer,store
    
    //actions.js  前文已经说过，action就是一个普通的对象，其中必须有type字段
    const action={
        type:'ADD_TODO',
        payload:'redux原理'
      }
      export default action;
      
      //reducers.js 定义一个纯函数，用于处理store内的state
      const reducer =(state={},action)=>{
        switch(action.type){
          case ADD_TODO:
              return newstate;
          default return state
        }
        export default reducer;
        
     //store.js store就是整个项目保存数据的地方，并且只能有一个。创建store就是把reducer给它
     import { createStore} from "redux";
     //把定义的reducer引入进来
     import reducer from "./reducer.js";
     // 全局就管理一个store
      const store = createStore(reducer)
      export default store;
  
     //至此三个文件定义完成，那组件如何去更新store内的state呢？
     //component.js,定义一个我们的组件
   
      import React, { Component } from 'react';  
      import store from './store';
      import action from './action';
      export default class Home extends Component {
          componentDidMount(){
              //redux需要调用store.subscribe监听store的变化，store.getState用来获取store内的state，
              //store.subscribe调用返回的值unsubscribe在页面卸载的时候调用，目的是取消页面对store的监听，防止内存泄漏
              let unsubscribe = store.subscribe(() =>
                    console.log(store.getState())
              );
              //unsubscribe();
          }
          change=()=>{
              //store.dispatch会向store发送action，store接收到action后就会自动调用reducers，
              //reducers根据action中的type执行相应的处理逻辑，并且返回新的state给到store，
              //此时store.subscribe(）就会被触发，通过store.getState()就可以拿到store内的state值
              store.dispatch(action);
              //其实就是一下代码
             // store.dispatch({
              //  type: 'ADD_TODO',
               // payload: 'redux原理'
              //});
          }
          render() {
              return <div className='container'>
                  <p onClick={this.change}>test</p>
              </div>
          }
      }
  