import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "2.4",
  payload: function(cmpConfig) {
    // let props = cmpConfig.props;
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.72 49.72" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height}">
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color}" d="M25.14.28A24.86,24.86,0,1,1,.28,25.14,24.86,24.86,0,0,1,25.14.28Zm-13.51,26H4.83a20.36,20.36,0,0,0,18,19.09V38.51A13.55,13.55,0,0,1,11.63,26.27Zm27,0A13.55,13.55,0,0,1,27.4,38.51v6.85A20.36,20.36,0,0,0,45.45,26.27ZM25.14,16.1a9,9,0,1,0,9,9A9,9,0,0,0,25.14,16.1ZM27.4,4.92v6.85a13.56,13.56,0,0,1,10.87,10H45.2A20.37,20.37,0,0,0,27.4,4.92Zm-4.52,6.85V4.92A20.35,20.35,0,0,0,5.08,21.75H12a13.56,13.56,0,0,1,10.87-10Z" transform="translate(-0.28 -0.28)"/>
</svg>`;
  },
});
