import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "2.2",
  payload: function(cmpConfig) {
    // let props = cmpConfig.props;
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.43 50" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px">
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color}" d="M34.14,0A14.29,14.29,0,1,0,48.43,14.29,14.28,14.28,0,0,0,34.14,0ZM10.93,21.43a8.93,8.93,0,1,0,8.93,8.93A8.93,8.93,0,0,0,10.93,21.43ZM34.14,35.72a7.14,7.14,0,1,0,7.14,7.14A7.14,7.14,0,0,0,34.14,35.72Z" transform="translate(-2 0)"/>
</svg>`;
  },
});
