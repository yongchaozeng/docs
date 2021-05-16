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
// render方法来自ReactDOMLegacy
```

```
// ReactDOMLegacy
**
element, react节点
container, 容器
callback  执行之后的回调
*
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
legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function,
){
 // 初始化时container肯定没有这样一个属性，所以执行!root流程
  let root: RootType = (container._reactRootContainer: any);

  if(!root){
    // 创建root
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
    container,
    forceHydrate,
    );
    // 创建FiberRoot
    fiberRoot = root._internalRoot;
  }
  // 禁用批量操作
  unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
  });

}
 

```
updateContainer( 
  element: ReactNodeList,  jsx
  container: OpaqueRoot,  // fiberRoot
  parentComponent: ?React$Component<any, any>,  null
  callback: ?Function,
){ 
   // 开启调度
  const root = scheduleUpdateOnFiber(current, lane, eventTime);

}
```
// 删除div子节点并创建root
function legacyCreateRootFromDOMContainer(
  container: Container,  //div
  forceHydrate: boolean, //false
){
 //false  是否要保留div的子节点  forceHydrate服务端渲染
  const shouldHydrate =   forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  // 删除div子节点
  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }
    return createLegacyRoot(
    container,
    shouldHydrate
      ? {
          hydrate: true,
        }
      : undefined,
  );

}

 // createLegacyRoot => new ReactDOMLegacyRoot => createRootImpl => createContainer

 function ReactDOMLegacyRoot(container: Container, options: void | RootOptions) {
  this._internalRoot = createRootImpl(container, LegacyRoot, options);
}

function createRootImpl(
  container: Container,
  tag: RootTag,
  options: void | RootOptions,
) {
// 创建root和FiberRoot
  const root = createContainer(
    container,  //div
    tag,    // 0
    hydrate, //false
    hydrationCallbacks, //null
    strictModeLevelOverride,
  );
}




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
stateNode:对应实例 RootFiber 指向 FiberRoot
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
alternate current=>workInprogress
}

### Update

记录组件状态，存放在 UpdateQueue，多个 Update 可以共存

## scheduler 整体流程

## performWork

是否有 deadline 区分
循环渲染 Root 的条件
超过时间片的处理
