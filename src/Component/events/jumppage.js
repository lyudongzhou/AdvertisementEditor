import { register } from "@/register";
import { REG_EVENTS } from "@/const";
register(REG_EVENTS, {
    type: "jumpPage",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
            vm.$store.dispatch('currentRenderState/jumpPage')
        }
    }
});
