import { register } from "@/register";
import { REG_EVENTS } from "@/const";
register(REG_EVENTS, {
    type: "log",
    payload: {
        eventKey: "click",
        method(eventValue, e, vm) {
            console.log(eventValue, e, vm);
        }
    }
});