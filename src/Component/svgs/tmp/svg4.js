import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "0.3",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.75 49.75" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px">
    <defs>
        <style>.cls-0-3{fill:${cmpConfig.props.color};}</style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M24.88-.39A24.88,24.88,0,1,0,49.75,24.48,24.87,24.87,0,0,0,24.88-.39Zm2.37,42a3.43,3.43,0,0,1-2.37,1,3.26,3.26,0,0,1-2.31-.92,3.35,3.35,0,0,1-1-2.37A3.47,3.47,0,0,1,22.5,37,3.39,3.39,0,0,1,27.18,37a3.46,3.46,0,0,1,1,2.37,3.28,3.28,0,0,1-.92,2.3Zm.92-10.72a3.3,3.3,0,0,1-6.59,0V9.43a3.3,3.3,0,0,1,6.59,0Z" transform="translate(0 0.39)"/>
</svg>`;
  },
});
