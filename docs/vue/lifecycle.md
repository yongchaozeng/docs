 
# 生命周期16.4

### 挂载
- constructor
初始化state和修改函数this指向

- static getDerivedStateFromprops
根据props修改state，静态方法

- render
检查props和state并返回DOM，组件，布尔，数组，<>

- componentDidMount
组件挂载时调用一次，ajax一般在这个阶段，在setState触发二次渲染


### 更新


- getSnapshotBeforeupdate
获取return钱的dom状态，然后传递给componentDidUpdate

- showldComponent(props,state)
根据返回值决定是否渲染，false不影响子组件渲染，首次渲染和forceUpdate不触发，官方推荐pureComponent来自动浅比较

- componentDidUpdate(prevProps,prevState,snaPshot)
首次渲染不执行，更新后立刻执行，可操作性DOM


### 卸载
- componentDidUnmount
组件卸载时调用，清除定时器、事件
