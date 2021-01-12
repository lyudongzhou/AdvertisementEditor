import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "0.2",
  payload: function(cmpConfig) {
    // let props = cmpConfig.props;
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 41.28" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height}">
    <defs>
        <style>.cls-0-2{fill:${cmpConfig.props.color};}</style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M17.83,46A23.92,23.92,0,0,1,30,39.65,32.2,32.2,0,0,1,50,19V46ZM37.69,20.91a14,14,0,0,0-27.22,4.34,14.38,14.38,0,0,0,.44,3.52,26.82,26.82,0,0,0-3.23-.22,25,25,0,0,0-2.87.2l-.69-.57L7.7,22.84,5.76,16.72l5.9-2.54L13.33,8l6.33,1,4.77-4.3L29.18,9l6.33-1,1.68,6.2,5.75,2.47A40.55,40.55,0,0,0,37.69,20.91ZM13.84,25.25a10.58,10.58,0,0,1,21.07-1.32A38.41,38.41,0,0,0,28.46,35a11.44,11.44,0,0,1-2.87.74,25.82,25.82,0,0,0-10.81-6.19A10.82,10.82,0,0,1,13.84,25.25Zm9.35,13.87A28.74,28.74,0,0,0,13.9,46H0V32.85A21.41,21.41,0,0,1,23.19,39.12Z" transform="translate(0 -4.72)"/>
</svg>`;
  },
});
