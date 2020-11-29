import { reg } from "@/registor";
import { REG_EVENTS } from "@/const";
reg(REG_EVENTS, {
    type: "jumpPage",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
            vm.$store.dispatch('currentRenderState/jumpPage')
        }
    }
});
