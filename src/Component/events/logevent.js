import { reg } from "./reg";
reg({
    type: "log",
    eventKey: "click",
    method(eventValue, e, vm) {
        console.log(eventValue, e, vm);
    }
});