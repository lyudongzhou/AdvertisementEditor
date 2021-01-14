import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "2.1",
  payload: function(cmpConfig) {
    // let props = cmpConfig.props;
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.28 49.76" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height}">
    <defs>
        <style>.cls-2-1{fill:${cmpConfig.props.color};}}</style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M47.93,26.15,44.37,24.8C30.32,19.47,14.79,27,9.68,41.67l-1.76,5,3.56,1.35c14.05,5.33,29.58-2.21,34.69-16.86Z" transform="translate(-1.65)"/>
    <path style="fill:${cmpConfig.props.color};" d="M18.69,0,15.37,2C2.24,10.09-2.25,27.92,5.32,41.87l2.61,4.8,3.33-2c13.12-8.05,17.62-25.89,10-39.83Z" transform="translate(-1.65)"/>
</svg>`;
  },
});
