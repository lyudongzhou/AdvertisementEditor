import {register} from "@/register";
import {SVGS} from "@/const";
register(SVGS,{
  type: "0.0",
  payload: function(cmpConfig) {
      let props = cmpConfig.props;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.width}; fill: ${props.color};"><circle cx="50%" cy="50%" r="100"></circle></svg>`;
  }
});
