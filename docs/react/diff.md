# diff

## 动机
将一棵树装成另外一颗树最小操作数，把current Fiber最小操作转换成JSX转化的workInprogress Fiber树
* 两个不同类型生成不同树
* 通过key来保存节点
* 只同级比较

## diff算法
首先比较根节点
* 根节点类型不同直接重新构建
* 对比相同类型，保留DOM，更新改变的属性
* 同类型的组件元素，保留实例，但更新state

## diff实现 reconcileChildFibers 根据newChild类型选择不同diff函数处理
newChild object类型 reconcileSingleElement 

newChild string|number类型 reconcileSingleTextNode  

newChild array类型 reconcileChildrenArray  

// 以上都没有命中，删除节点

当newChild类型为object、number、string，代表同级只有一个节点

当newChild类型为Array，同级有多个节点

在接下来两节我们会分别讨论这两类节点的Diff。
