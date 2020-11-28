const tplMap = {};
const schemaMap = {};
/**
 * @description reg the event config
 * @author lyuDongzhou
 * @date 2020-11-28
 * @export
 * @param {*} event
 */
export function reg(cmp){
    if(tplMap[cmp.type]){
        throw new Error(`${cmp.type} has already been registered`);
    }
    tplMap[cmp.type] = cmp.tpl;
    schemaMap[cmp.type] = cmp.schema;
}
export {tplMap,schemaMap};