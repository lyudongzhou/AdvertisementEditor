import { register } from "@/register";
import { REG_EVENTS } from "@/const";
register(REG_EVENTS, {
    type: "openTheWindow",
    payload: {
        eventKey: "click",
        method(eventProps, eventObj, vm) {
          vm.$store.commit("currentRenderState/addWindowData", {
            toId: eventProps.openId,
            backTime: eventProps.backTime,
            type: 'dialogs'
          });
          vm.$store.commit("currentRenderState/jumpPage", eventProps.openId);
        }
    }
});
