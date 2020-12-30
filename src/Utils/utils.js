import { v1 as uuidv1 } from 'uuid';
import Vue from 'vue';


export const clone = obj => JSON.parse(JSON.stringify(obj));

export function getPropByPath(obj = {}, path = '', defaultValue) {
  return path
    // 将[]替换为. 且如果以[]开头的吧第一个.去掉
    .replace(/\[([^\]]+)\]/g, (match, p1, offset) => offset ? `.${p1}` : p1)
    // path 数组
    .split('.')
    .reduce((p, c) => p ? p[c] : defaultValue, obj);
}

export function setPropByPath(obj = {}, path = '', value) {
  return path
    // 将[]替换为. 且如果以[]开头的吧第一个.去掉
    .replace(/\[([^\]]+)\]/g, (match, p1, offset) => offset ? `.${p1}` : p1)
    // path 数组
    .split('.')
    .reduce((p, c, index, {length}) => {
      if (length === index + 1) {
        Vue.set( p, c, value )
        // p[c] = value;
      }
      return p[c]
    }, obj);
}

export function getUuid() {
  return uuidv1();
}

export function switchArrayIndex(array, from, to) {
  const fromItem = array[from];
  const toItem = array[to];
  Vue.set(array, from, toItem);
  Vue.set(array, to, fromItem);
  return array;
}
