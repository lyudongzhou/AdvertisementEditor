import { reg } from "@/registor";
import { REG_EVENTS } from "@/const";
reg(REG_EVENTS, {
    type: "prePage",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
            vm.$store.commit("currentRenderState/prePage");
        }
    }
});