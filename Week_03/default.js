//                   i
// 暴力解
function findStr(source, pattern) {
  let i = 0, j = 0;
  let index = 0;
  const l1 = source.length;
  const l2 = pattern.length;
  while (i < l1 && index <= l1 - l2) {
    if (pattern[j] === source[i]) {
      if (j === l2 - 1) {
        return index;
      }
      ++i;
      ++j;
    } else {
      j = 0;
      ++index;
      i = index;
    }
  }
  return -1;
}

function getList(pattern) {
  let i = 0;
  let list = [0];
  for (let j = 1; j < pattern.length; j++) {
    while (i > 0 && pattern[j] !== pattern[i]) {
      i = list[i - 1];
    }
    if (pattern[j] === pattern[i]) {
      ++i;
    }
    list[j] = i;
  }
  return list;
}

function kmp(source, pattern) {
  const list = getList(pattern);
  let i = 0, j = 0;
  const l1 = source.length;
  const l2 = pattern.length;
  while (i < l1) {
    if (pattern[j] === source[i]) {
      if (j === l2 - 1) {
        return i - j;
      }
      ++i;
      ++j;
    } else {
      if (i === l1 - 1) {
        return -1;
      }
      if (j > 0) {
        j = list[j - 1];
      } else {
        ++i;
      }
    }
  }
  return -1;
}

String.prototype.hasStr = function (str) {
  return kmp(this, str);
}

console.log('hello'.hasStr('aa'));