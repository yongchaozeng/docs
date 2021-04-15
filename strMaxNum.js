const str = 'asds';
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
console.log(stringSort(str));


