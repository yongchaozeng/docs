# reactRender

## 步骤

- 创建 ReactRoot
- 创建 FiberRoot 和 RootFiber
- 创建更新

```
// 入口文件 React-dom/client/ReactDom

const ReactDom = {
render(){}
}
```

```
// ReactDOMLegacy

render(element,container,callback?){
 return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}
```

```
创建root legacyCreateRootFromDOMContainer

  const root = createContainer(
    container,  //div
    tag,    // 0
    hydrate, //false
    hydrationCallbacks, //null
    strictModeLevelOverride,
  );
```

createContainer 中 createFiberRoot 创建 FiberRoot 整个应用的根节点


### FiberRoot
FiberRoot:{
// root 节点，render 方法接收的第二个参数
containerInfo: any,
current: Fiber,

}

### Fiber

每一个节点都对应一个 Fiber 对象，记录节点状态，通过属性构建 Fiber 树
Fiber:{
tag:组件类型
stateNode:对应实例 RootFiber指向FiberRoot
return:父 Fiber
sibling:兄弟 Fiber
child:子 Fiber
key: key
elementType :div p
type:class|function
effectTag
nextEffect
firstEffect
lastEffect
alternate  current=>workInprogress
}

### Update
记录组件状态，存放在UpdateQueue，多个Update可以共存

## scheduler整体流程

## performWork
是否有deadline区分 
循环渲染Root的条件
超过时间片的处理


