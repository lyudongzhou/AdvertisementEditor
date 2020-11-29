import { reg } from "@/registor";
import { REG_EVENTS } from "@/const";
reg(REG_EVENTS, {
    type: "openDialog",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
          vm.$store.commit("currentRenderState/addDialogData", {
            toId: eventProps.openId,
            backTime: eventProps.backTime,
            type: 'dialogs'
          });
          vm.$store.commit("currentRenderState/jumpPage", eventProps.openId);
        }
    }
});
