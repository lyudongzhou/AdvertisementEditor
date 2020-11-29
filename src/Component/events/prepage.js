import { register } from "@/register";
import { REG_EVENTS } from "@/const";
register(REG_EVENTS, {
    type: "prePage",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
            vm.$store.commit("currentRenderState/prePage");
        }
    }
});