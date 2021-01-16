import { v1 as uuidv1 } from 'uuid';
import Vue from 'vue';

const ONE_SEC_TIMESTAMP = 1000;
const ONE_MIN_TIMESTAMP = ONE_SEC_TIMESTAMP * 60;
const ONE_HOUR_TIMESTAMP = ONE_MIN_TIMESTAMP * 60;
export const ONE_DAY_TIMESTAMP = ONE_HOUR_TIMESTAMP * 24;

export const clone = obj => JSON.parse(JSON.stringify(obj));

export function getPropByPath(obj = {}, path = '', defaultValue) {
  return path
    // 将[]替换为. 且如果以[]开头的吧第一个.去掉
    .replace(/\[([^\]]+)\]/g, (match, p1, offset) => offset ? `.${p1}` : p1)
    // path 数组
    .split('.')
    .reduce((p, c, i, {length}) => {
      if (length === i + 1 && (!p || !p[c])) {
        return defaultValue;
      }
      return p ? p[c] : undefined;
    }, obj);
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


function fixWithZero(value, max = 2) {
  value = value + '';
  const {length} = value;
  if (length < max) {
    let needFixCount = max - length;
    while (needFixCount > 0) {
      value = '0' + value;
      needFixCount--;
    }
  }
  return value;
}

export function getTimeRemainStr(timestamp, format) {
  if (format === 'dd') {
    return `${fixWithZero(Math.ceil(timestamp / ONE_DAY_TIMESTAMP))}天`;
  }
  if (format === 'ddHHmmss') {
    let timeRemain = timestamp;
    const day = Math.floor(timestamp / ONE_DAY_TIMESTAMP);
    timeRemain -= day * ONE_DAY_TIMESTAMP;
    const hour = Math.floor(timeRemain / ONE_HOUR_TIMESTAMP);
    timeRemain -= hour * ONE_HOUR_TIMESTAMP;
    const min = Math.floor(timeRemain / ONE_MIN_TIMESTAMP);
    timeRemain -= min * ONE_MIN_TIMESTAMP;
    const sec = Math.floor(timeRemain / ONE_SEC_TIMESTAMP);
    return `${fixWithZero(day)}天${fixWithZero(hour)}时${fixWithZero(min)}分${fixWithZero(sec)}秒`;
  }
}
