import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "0.0",
  payload: function(cmpConfig) {
    console.log(111);
    // let props = cmpConfig.props;
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 42.38" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height}">
    <defs>
        <style></style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M21,39.13a15.62,15.62,0,1,0,7.45-22.45l12.8,22.18c.09.15,0,.27-.14.27ZM18.61,4.46,0,36.65c-.07.14,0,.24.13.24H37.33c.15,0,.21-.11.13-.24L18.89,4.46a.15.15,0,0,0-.28,0Z" transform="translate(0 -4.36)"/>
    </svg>`;
  },
});
