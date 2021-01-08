function getNext(pattern) {
  let next = new Array(pattern.length).fill(0);
  let j = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] != pattern[j] && pattern[i] !== '?' && pattern[j] !== '?') {
      j = next[j - 1];
    }
    if (pattern[i] == pattern[j] || pattern[i] === '?' || pattern[j] === '?') {
      j++;
    }
    next[i] = j;
  }
  return next;
}

function kmp(source, pattern, start) {
  // 计算next组数（前缀表）
  const next = getNext(pattern);
  let i = start || 0, j = 0;
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

function find(source, pattern) {
  let starCount = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      starCount++;
    }
  }
  if (starCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?') {
        return false;
      }
    }
    return;
  }

  let i = 0;
  let lastIndex = 0;

  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false;
    }
  }

  lastIndex = i;

  for (let p = 0; p < starCount - 1; p++) {
    i++;
    let subPattern = "";
    while (pattern[i] !== '*') {
      subPattern += pattern[i];
      i++;
    }

    // kmp实现
    // console.log(source, subPattern, lastIndex);
    const index = kmp(source, subPattern, lastIndex + 1);
    if (index - lastIndex > -1) {
      lastIndex = index + subPattern.length;
    } else {
      return false;
    }
    // console.log(lastIndex);

    // 正则实现
    // let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
    // reg.lastIndex = lastIndex;
    // if (!reg.exec(source)) {
    //   return false;
    // }
    // lastIndex = reg.lastIndex;
  }

  for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
    if (pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== '?') {
      return false;
    }
  }
  return true;
}

// 0123456789
// abcabcabxaac
// a*  b* bx* c


console.log(find('abcabcabxaac', 'a*b*bx*c'));
// console.log(find('acdcb', 'a*cb'));
