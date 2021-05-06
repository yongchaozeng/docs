---
theme: channing-cyan
---

 
  
- 大数相加
- 数组降维
- 快速排序
- n以内素数
- 两数相加
- 字符串中出现最大的字符 
- Promise
- 手写Promise.all
- useDebounce
- useThrottle
- useScroll

 ## 大数相加
 > javascript的Number精度有限，最大整数2^53 - 1，超过就不准确，这里可以使用BigInt来计算

 ```
 // Number
 9007199254740991+3617264626230116     //12624463880971108
 // BigInt
 9007199254740991n+3617264626230116n   //12624463880971107n
 ```
>也可以自己封装大数相加，核心思路就是转换为String，在通过0补位让两个数字位数一样，在进行计算
```
let num1 = 9007199254740991;
let num2 = 3617264626230116;

function add(num1, num2) {
    let maxLength = null, sum = '', carry = 0, remainder = 0;
    num1 = num1.toString()  // 数字转换string
    num2 = num2.toString()
    maxLength = Math.max(num1.length, num2.length); //找出两个数最大的长度
    num1 = num1.padStart(maxLength, '0') //把两个字符串补位到相同
    num2 = num2.padStart(maxLength, '0')

    // 满10进1
    for (let index = maxLength - 1; index >= 0; index--) {
        remainder = parseInt(num1[index]) + parseInt(num2[index]) + carry
        carry = Math.floor(remainder / 10)
        sum = remainder % 10 + sum
    }

    if (carry === 1) {
        sum = 1 + sum
    }

    return sum
}
add(num1, num2)
```

## 数组降维

> 使用reduce累加，非数组直接concat添加，数组就递归调用

```
let array = [1,2,3,[4,[5,{name:'张三'}]]]

const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]'

function flat(array) {
    return array.reduce((sum, next) => {
        return isArray(next) ? sum.concat(flat(next)) : sum.concat(next)
    }, [])
}

flat(array)
``` 
 

## 快速排序
> 找一个基准值（这里是选的数组中间的数，方便理解），根据基准值分别获取一个大于值的数组left，和一个小于基准值的数组right，两个数组left和right递归执行，当left和right只剩下一项的时候就返回自己本身，最后把值组合起来

```
        function quickSort(arr) {
            if (arr.length <= 1) return arr
            const len = arr.length
            const mid = Math.floor(len / 2)
            const midArray = arr.splice(mid, 1)
            const midValue = midArray[0]
            const left = []
            const right = []
            
            for (let i = 0; i < len; i++) {
                if (arr[i] >= midValue) {
                    right.push(arr[i])
                } else if (arr[i] < midValue) {
                    left.push(arr[i])
                }
            }

            return quickSort(left).concat(midArray, quickSort(right))
        }
```
## n内素数的个数
> 素数除了1和該数自身外，無法被其他自然数整除的数，被除了1和自身外的数去余不为0就不是素数
```
let countPrimes = function (n: any) {
  let ans: any = 0;
  for (let i = 2; i <=n; ++i) {
    ans += isPrime(i);
  }
  return ans;
};

const isPrime = (x: any) => {
  for (let i = 2; i * i <= x; ++i) { 
    if (x % i == 0) {
      return false;
    } 
  } 
  return true;
};
countPrimes(100) //25
```
## 两数相加
> 使用对象记录值，key为值，value为index，两个value相加等于目标值时，就返回index
```
function twoSum (nums, target) {
    let obj = {}
    
    for (let i = 0; i < nums.length; i++) {
        if (obj[nums[i]] == undefined) {
            obj[nums[i]] = i
        }
        
        if (obj[target - nums[i]] !== undefined && obj[target - nums[i]] - i) {
            return [obj[target - nums[i]], i]
        }
    }
    
};
twoSum([2, 3, 4, 5, ], 9) // [2,3]
```

## 找出字符串出现次数最多的字符
```
function stringSort(str) {
  const obj = {}; // 存储字符串出现次数
  const len = str.length;
  let maxStr = ""; // 存储字符串
  let maxNum = 0; // 字符串出现的最多次数

  for (let index = 0; index < len; index++) {
    let key = str[index];
    // 对象key没有值就赋值1，有值就加1
    if (!obj[key]) {
      obj[key] = 1;
    } else {
      obj[key]++;
    }
    // 大于之前的字符串出现次数，就替换成新的字符串
    if (obj[key] > maxNum) {
      maxNum = obj[key];
      maxStr = key;
    }
  }

  return [maxStr, maxNum];
}
stringSort('dfgdfgaaadffg') // ["f", 4]
```

## Promise
```
   function MyPromise(executor) {
            this.status = 'pending'
            this.data = null
            this.resolvedCallback = []
            this.rejectedCallback = []

            const resolve = (value) => {
                setTimeout(() => {
                    if (this.status === 'pending') {
                        this.status = 'resolve'
                        this.data = value
                        this.resolvedCallback.map((fn) => {
                            fn(value)
                        })
                    }
                })
            }

            const reject = (reason) => {
                if (this.status === 'pending') {
                    this.status = 'reject'
                    this.data = reason
                    this.rejectedCallback.map((fn) => {
                        fn(reason)
                    })
                }
            }
            try {
                executor(resolve, reject)
            } catch (error) {
                reject(error)
            }
        }

        MyPromise.prototype.then = function (onResolved, onRejected) {
            let self = this
            if (self.status === 'resolve') {
                return new MyPromise((resolve, reject) => {
                    let x = onResolved(this.data)
                    resolvePromise(x, resolve, reject)
                })
            } else if (self.status === 'reject') {
                return new MyPromise((resolve, reject) => {
                    let x = onRejected(this.data)
                    resolvePromise(x, resolve, reject)
                })
            } else {
                return new MyPromise((resolve, reject) => {
                    self.resolvedCallback.push((value) => {
                        let x = onResolved(value)
                        resolvePromise(x, resolve, reject)
                    })
                    self.rejectedCallback.push((value) => {
                        let x = onRejected(value)
                        resolvePromise(x, resolve, reject)
                    })
                })
            }
        }
        function resolvePromise(x, resolve, reject) {
            if (x instanceof MyPromise) {
                x.then(resolve, reject)
            } else {
                resolve(x)
            }
        }

```
 
## Promise.all
 
>返回的数组排序根据传入的Promise顺序，而不是执行顺序，有一个Promise失败，直接返回reject

  
```
function promiseAll(array) {
  let count = 0;
  const len = array.length;
  const result = new Array(len);
  return new Promise((resolve, reject) => {
    for (let index = 0; index < array.length; index++) {
      Promise.resolve(array[index]).then(
        (value) => {
          result[index] = value;
          count++;
          if (count === array.length) {
            resolve(result);
          }
        },
        (value) => {
          reject(value);
        }
      );
    }
  });
}
```

## usePersistFn
> 函数持久化，利用useRef的特性可以穿透闭包，获取最新的state，区别于useCallback可以不让子组件刷新的同时获取最新的state
```
function usePersistFn(fn) {
  const ref = useRef(fn);
  const fnRef = useRef()
  ref.current = fn;

  if (!fnRef.current) {
    fnRef.current = (...args) => {
      ref.current(...args)
    }
  }
  return fnRef.current;
}
```
 栗子
```
  const Foo = () => {
    const [num, setNum] = useState(0);
    const show = () => {
      console.log(num);
    };
    return (
      <>
        <div>{num}</div>
        <button
          onClick={() => {
            setNum((num) => num + 1);
          }}
        >
          add
        </button>
        <Bar show={show} />
      </>
    );
  };
  
  const Bar = React.memo(({ show }) => {
    useEffect(() => {
      console.log('Bar'); // 没有每次add时调用
    });
    return (
      <>
        <button
          onClick={() => {
            show();
          }}
        >
          show
        </button>
      </>
    );
  });
```



## useDebounce
> 一个常见的节流，但是在如果在react中使用并修改state，函数重新调用会让timeout不准确，防抖节流就失效了
```
function debounce(func, wait) {
  let timeout;

  let debounced = function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(function () { 
      func.apply(context, args);
    }, wait);
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

```

```
function useDebounce(fn, delay) {
  const ref = useRef(fn);
  ref.current = fn;

  let debounced = useCallback(
  // 这里使用上文的防抖
    debounce(() => {
      ref.current();
    }, delay),
    []
  );

  useEffect(() => {
    return () => {
      const callback = debounced;
      callback.cancel && callback.cancel();
    };
  }, [debounced]);

  return debounced;
}
}
```
 栗子
```
const Test = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick = useDebounce(function () { 
    setCounter1(counter1 + 1);
  }, 500);

  useEffect(function () {
    const t = setInterval(() => {
      setCounter2((x) => x + 1);
    }, 500);
    return clearInterval.bind(undefined, t);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Button
        onClick={function () {
          handleClick();
        }}
      >
        click
      </Button>
      <div>{counter1}</div>
      <div>{counter2}</div>
    </div>
  );
};
```
## useThrottle
> 和useDebounce相似
```
function throttle(func, wait) {
    let timeout; 

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
```
```

function useThrottle(fn, delay ) {
  const ref = useRef(fn);
  ref.current = fn;

  let throttled = useCallback(
    throttle(() => {
      ref.current();
    }, delay),
    []
  );

  useEffect(() => {
    return () => {
      throttled.cancel && throttled.cancel();
    };
  }, [throttled]);

  return throttled;
}


```

## useScroll
> 获取ref或者document的scrollLeft和scrollTop
```
const useScroll = (target) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const lister = (e) => {
    setPosition({
      left: e.target.scrollLeft || document.scrollingElement.scrollLeft,
      top: e.target.scrollTop || document.scrollingElement.scrollTop,
    });
  };

  useEffect(() => {
    let el = target === document ? document : target?.current;
    el && el.addEventListener('scroll', lister);

    return () => {
      el && el.removeEventListener('scroll', lister);
    };
  }, [target]);

  return position;
};
```
 栗子
```

const Demo = ()=>{
  const dom = useRef(); 
  const position = useScroll(dom);
  return (
    <>
      <div>{`${position.top},${position.left}`}</div>
      <div
        ref={dom}
        style={{
          overflow: 'auto',
          width: '300px',
          height: '200px',
          border: '1px solid red',
        }}
      >
        <div
          style={{ width: '900px', height: '200px', border: '1px solid red' }}
        ></div>
        <div
          style={{ width: '900px', height: '200px', border: '1px solid red' }}
        ></div>
        <div
          style={{ width: '900px', height: '200px', border: '1px solid red' }}
        ></div>
        <div
          style={{ width: '900px', height: '200px', border: '1px solid red' }}
        ></div>
        <div
          style={{ width: '900px', height: '200px', border: '1px solid red' }}
        ></div>
      </div>
    </>
  )
}
```






