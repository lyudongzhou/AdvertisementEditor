const regEvent = {};

/**
 * @description reg the event config
 * @author lyuDongzhou
 * @date 2020-11-28
 * @export
 * @param {*} event
 */
export function reg(event){
    regEvent[event.type] = event;
}
export default regEvent;