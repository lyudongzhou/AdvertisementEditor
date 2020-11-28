import { reg } from "./reg";
reg({
    type: "nextPage",
    eventKey: "click",
    method(eventProps, eventObj, vm) {
        vm.$store.dispatch('currentRenderState/nextPage')
    }
});