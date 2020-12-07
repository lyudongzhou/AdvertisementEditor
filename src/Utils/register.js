const regMap = {};
export function register(namespace, obj) {
  if (!regMap[namespace]) {
        regMap[namespace] = {};
    }
    if (obj.type === undefined) {
        throw new Error(`register ${namespace} an empty type`);
    }
    if (regMap[namespace][obj.type]) {
        throw new Error(`${namespace} ${obj.type} has already been registered`);
    }
    regMap[namespace][obj.type] = obj.payload;
}
export function get(namespace) {
    return regMap[namespace];
}