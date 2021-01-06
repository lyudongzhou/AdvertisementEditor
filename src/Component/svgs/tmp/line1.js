import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.0",
  payload: function(cmpConfig) {
    let props = cmpConfig.props;
    return `<svg viewBox="0 0 1000 100"
    xmlns="http://www.w3.org/2000/svg" style="width: ${cmpConfig.layoutConfig.width}px; height: 100px; stroke: ${props.color};">
    <g transform="translate(0 0) scale(1 1)">' + '        <line xmlns="http://www.w3.org/2000/svg" fill="none" stroke-miterlimit="10" stroke-width="3" x2="1000" y1="1.5" y2="1.5"></line>
        <line xmlns="http://www.w3.org/2000/svg" fill="none" stroke-miterlimit="10" stroke-width="3" x2="1000" y1="15.5" y2="15.5"></line>' + '
    </g>
</svg>`;
  },
});
