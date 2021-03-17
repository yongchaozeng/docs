# 路由

### hash 
监听浏览器hash值变化执行js

```
//设置 url 的 hash，会在当前url后加上'#abc'
window.location.hash='abc';
let hash = window.location.hash //'#abc'

window.addEventListener('hashchange',function(){
	//监听hash变化，点击浏览器的前进后退会触发
})

```

### history
使用H5 History API url改变执行js

```

history.length  history打开网页数量
history.state   history当前状态

history.go           0刷新 1前进 -1后退
history.back         后退
history.forward      前进

```

History.pushState(object, title, url) 添加一条记录，但是不会刷新页面

popstate 事件
每当 history 对象出现变化时，就会触发 popstate 事件。

```
window.addEventListener('popstate', function(e) {
	//e.state 相当于 history.state
	console.log('state: ' + JSON.stringify(e.state));
	console.log(history.state);
});
```