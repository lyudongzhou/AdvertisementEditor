import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.3",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.86 17" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px;color:${cmpConfig.props.color}">
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color}" d="M0,26.26H39.26V33l10.6-8.5L39.26,16v6.8H0Z" transform="translate(0 -16)"/>
</svg>`;
  },
});
