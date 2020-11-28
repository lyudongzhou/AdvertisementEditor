import { reg } from "@/registor";
import { REG_EVENTS } from "@/const";
reg(REG_EVENTS, {
    type: "log",
    payload: {
        eventKey: "click",
        method(eventValue, e, vm) {
            console.log(eventValue, e, vm);
        }
    }
});