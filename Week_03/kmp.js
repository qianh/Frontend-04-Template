function getNext(pattern) {
  let next = new Array(pattern.length).fill(0);
  let j = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] != pattern[j]) {
      j = next[j - 1];
    }
    if (pattern[i] == pattern[j]) {
      j++;
    }
    next[i] = j;
  }
  console.log(JSON.stringify(next));
  return next;
}

function kmp(source, pattern) {
  // 计算next组数（前缀表）
  const next = getNext(pattern);
  let i = 0, j = 0;
  while(i < source.length) {
    if (pattern[j] === source[i]) {
      ++i, ++j;
    } else {
      if (i === source.length - 1) {
        return -1;
      }
      if (j > 0) {
        j = next[j - 1];
      } else {
        ++i;
      }
    }
    if (j === pattern.length) {
      return i - j;
    }
  }
  return -1;
}

{
  const index = kmp('aabaabaaacc', 'aabaaac');
  console.log(index > -1 ? '起始位置：' + index : '未匹配');
}