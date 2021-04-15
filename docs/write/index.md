### 手写Promise.all
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
### 手写字符串出现最多的字符

```
function stringSort(str) {
  if (typeof str !== "string") {
    console.error("请传入字符串");
  }
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
```