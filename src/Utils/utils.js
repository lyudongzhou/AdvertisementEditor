export const clone = obj => JSON.parse(JSON.stringify(obj));
export function getPropByPath(obj = {}, path = '', defaultValue) {
  return path
    // 将[]替换为. 且如果以[]开头的吧第一个.去掉
    .replace(/\[([^\]]+)\]/g, (match, p1, offset) => offset ? `.${p1}` : p1)
    // path 数组
    .split('.')
    .reduce((p, c) => p ? p[c] : defaultValue, obj);
}