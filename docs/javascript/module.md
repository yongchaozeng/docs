# 模块化

### CommonJS                
Node.js 服务端

module.exports命令用于规范模块的对外接口，输出的是一个值的拷贝，输出之后就不能改变了，会缓存起来。

CommonJS 采用同步加载模块，而加载的文件资源大多数在本地服务器，所以执行速度或时间没问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。
```
// 模块 a.js
const name = 'qiufeng'

module.exports = {
    name,
    github: 'https://github.com/hua1995116'
}
// 模块 b.js
// 引用核心模块或者第三方包模块，不需要写完整路径
const path = require('path');
// 引用自定义模块可以省略.js
const { name, github } = require('./a');

console.log(name, github, path.basename(github));
// 输出 qiufeng https://github.com/hua1995116 hua1995116
```

### AMD (Asynchronous Module Definition)
异步模块定义 其中 RequireJS 是最佳实践者  推崇依赖前置、提前执行

异步方式加载模块，模块加载不影响后面语句，依赖模块的会在后调，等在依赖执行完执行

主要命令：define定义模块、require引入、return返回
```
// model1.js
define(function () {
    console.log('model1 entry');
    return {
        getHello: function () {
            return 'model1';
        }
    };
});
// model2.js
define(function () {
    console.log('model2 entry');
    return {
        getHello: function () {
            return 'model2';
        }
    };
});
// main.js
define(function (require) {
    var model1 = require('./model1');
    console.log(model1.getHello());
    var model2 = require('./model2');
    console.log(model2.getHello());
});
<script src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
<script>
    requirejs(['main']);
</script>
// 输出结果  
// model1 entry
// model2 entry
// model1
// model2
```

### CMD (Common Module Definition - 通用模块定义)
通用模块定义 Sea.js推广中形成的 依赖就近、延迟执行
```
// model1.js
define(function (require, exports, module) {
    console.log('model1 entry');
    exports.getHello = function () {
        return 'model1';
    }
});
// model2.js
define(function (require, exports, module) {
    console.log('model2 entry');
    exports.getHello = function () {
        return 'model2';
    }
});
// main.js
define(function(require, exports, module) {
    var model1 = require('./model1'); //在需要时申明
    console.log(model1.getHello());
    var model2 = require('./model2'); //在需要时申明
    console.log(model2.getHello());
});
<script src="https://cdn.bootcss.com/seajs/3.0.3/sea.js"></script>
<script>
    seajs.use('./main.js')
</script>
// 输出 
// model1 entry
// model1
// model2 entry
// model2
```

### UMD (Universal Module Definition - 通用模块定义) 
该模式主要用来解决CommonJS模式和AMD模式代码不能通用的问题，并同时还支持老式的全局变量规范。

```
// bundle.js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.myBundle = factory());
}(this, (function () { 'use strict';

    var main = () => {
        return 'hello world';
    };

    return main;

})));
// index.html
<script src="bundle.js"></script>
<script>
  console.log(myBundle());
</script>
```
- 判断define为函数，并且是否存在define.amd，来判断是否为AMD规范,
- 判断module是否为一个对象，并且是否存在module.exports来判断是否为CommonJS规范
- 如果以上两种都没有，设定为原始的代码规范


### ES Modules
- 它因为是标准，所以未来很多浏览器会支持，可以很方便的在浏览器中使用。(浏览器默认加载不能省略.js)
- 它同时兼容在node环境下运行。
esmodule输出值引用，common输出值拷贝
esmodule编译时执行，comon运行时加载

##### CommonJS 的值拷贝
```
// a.js
const b = require('./b');
console.log(b.age);
setTimeout(() => {
  console.log(b.age);
  console.log(require('./b').age);
}, 100);
// b.js
let age = 1;
setTimeout(() => {
  age = 18;
}, 10);
module.exports = {
  age
}
// 执行：node a.js
// 执行结果：
// 1
// 1
// 1
```

##### modules 的值的引用
```
// a.js
import { age } from './b.js';

console.log(age);
setTimeout(() => {
    console.log(age);
    import('./b.js').then(({ age }) => {
        console.log(age);
    })
}, 100);

// b.js
export let age = 1;

setTimeout(() => {
    age = 2;
}, 10);
// 打开 index.html
// 执行结果：
// 1
// 2
// 2
```
