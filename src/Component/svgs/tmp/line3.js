import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.2",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 46.04" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height};color:${cmpConfig.props.color}">
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color}" d="M16.1,16.61A10.26,10.26,0,0,1,19.89,2.7a10.24,10.24,0,0,1,14,3.75l-2,1.14a8,8,0,0,0-13.81,7.9ZM10.23,47.37A10.26,10.26,0,0,1,0,37.14,10.25,10.25,0,0,1,10.23,26.92c3.64,0,10,1.54,23.39,14.91,3.2,3.19,7,4,10.12,2.21a8,8,0,0,0,2.91-10.87l2-1.13a10.25,10.25,0,0,1-3.74,14c-4,2.32-9,1.34-12.86-2.57-9.59-9.58-16.71-14.24-21.79-14.24a8,8,0,0,0,0,15.91v2.27Z" transform="translate(0 -1.33)"/>
    <path style="fill:${cmpConfig.props.color}" d="M50,37.15H47.73a8,8,0,0,0-8-7.95V26.92A10.26,10.26,0,0,1,50,37.15ZM33.85,16.66l-2-1.13a8,8,0,0,0-13.78-8l-2-1.13A10.22,10.22,0,0,1,33.85,16.66Z" transform="translate(0 -1.33)"/>
    <path style="fill:${cmpConfig.props.color}" d="M10.19,47.36A10.26,10.26,0,0,1,5.11,46,10.26,10.26,0,0,1,1.37,32l2,1.13a8,8,0,0,0,13.78,8L31.89,15.53l2,1.13L19.08,42.25A10.14,10.14,0,0,1,12.87,47,10.61,10.61,0,0,1,10.19,47.36Z" transform="translate(0 -1.33)"/>
</svg>`;
  },
});
