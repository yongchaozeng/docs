# DOM (dom document object model)

### Node类型
* nodeType 1 元素节点
* nodeType 3 文本节点
* nodeType 9 Document

### 节点属性
nodeName
nodeValue

### 节点关系

``` 
    <div class="father">
        <p>1</p>
        <p id='sun'>123<span>sun1</span><span>sun2</span></p>
        <p>3</p>
        <p>4</p>
    </div>

    let i = document.querySelector('#sun')
    console.log(i.parentNode);                  //父
    console.log(i.nextElementSibling);          //弟
    console.log(i.previousElementSibling);      //兄
    console.log(i.firstElementChild);           //长子
    console.log(i.children);                    //子嗣

```
加上element就不会获取文本节点

### 操作节点

createElement
createTextNode
createDocumentFragment

appendChild
insertBefore
removeChild
replaceChild

cloneNode true深复制，复制子dom树 false只复制节点本身  不会复制事件


### 属性

    setArrtibete
    getArrtibete
    document.documentElement                    //html
    document.body                               //body
    document.title                               //body
    document.domain                               //body
    document.referrer                               //body  

### 事件流

捕获阶段->
目标阶段->
冒泡阶段

事件一开始从document向下到目标，在返回document  

### 事件处理
addEventListenet

removeEventListenet

事件名，回调，事件流触发方式true为捕获，false为冒泡

##### W3C
event事件对象

e.type 事件类型

e.target 事件对象

e.currentTarget 绑定事件的对象

e.preventDefault 阻止默认行为

e.stopPropagation 阻止冒泡

##### IE
event.returnValue设为false就可以阻止默认行为

event.cancelBubble设置为true用来停止事件冒泡

 