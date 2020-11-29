import { register } from "@/register";
import { REG_EVENTS } from "@/const";
register(REG_EVENTS, {
    type: "nextPage",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
            vm.$store.dispatch('currentRenderState/nextPage')
        }
    }
});