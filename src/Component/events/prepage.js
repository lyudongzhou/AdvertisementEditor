import { reg } from "./reg";
reg({
    type: "prePage",
    eventKey: "click",
    method(eventProps, eventObj, vm) {
        vm.$store.commit("currentRenderState/prePage");
    }
});