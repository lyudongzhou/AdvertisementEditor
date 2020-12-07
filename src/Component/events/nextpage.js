/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 04:01:05
 * @LastEditTime: 2020-12-07 04:01:11
 * @Description: file content
 */
import { register } from "@/register";
import { REG_EVENTS } from "@/const";
import { mapGetters, mapMutations } from "../../Render/store"
register(REG_EVENTS, {
    type: "nextPage",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
            let nextID = mapGetters(["nextID"])["nextID"].bind(vm)().id;
            if (nextID) {
                mapMutations(["jumpPage"])["jumpPage"].bind(vm)(nextID);
            }
        }
    }
});