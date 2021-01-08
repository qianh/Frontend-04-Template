function getList(pattern) {
  let i = 0;
  let j = 1;
  let list = [0];
  while (j < pattern.length) {
    while (i > 0 && pattern[j] !== pattern[i]) {
      i = list[i - 1];
    }
    if (pattern[j] === pattern[i]) {
      ++i;
    }
    list[j] = i;
    ++j;
  }
  return list;
}

function getList2(pattern) {
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

console.log(JSON.stringify(getList('aabaaac')))