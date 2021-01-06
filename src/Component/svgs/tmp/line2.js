import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.1",
  payload: function(cmpConfig) {
    let props = cmpConfig.props;
    return `<svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px; stroke: ${props.color});"><g transform="translate(0 0) scale(1 1)">' + '<line xmlns="http://www.w3.org/2000/svg" y1="3" x2="9.5" y2="3" fill="none" stroke-miterlimit="10" stroke-width="6"></line><line xmlns="http://www.w3.org/2000/svg" x1="15.49" y1="3" x2="15.5" y2="3" fill="none" stroke-miterlimit="10" stroke-width="6" stroke-dasharray="0.01 0 0 0"></line><line xmlns="http://www.w3.org/2000/svg" x1="15.5" y1="3" x2="990.5" y2="3" fill="none" stroke-miterlimit="10" stroke-width="6" stroke-dasharray="19 5.99 0.01 0 0 0"></line><line xmlns="http://www.w3.org/2000/svg" x1="990.5" y1="3" x2="1000" y2="3" fill="none" stroke-miterlimit="10" stroke-width="6"></line>' + '</g></svg>`;
  },
});
