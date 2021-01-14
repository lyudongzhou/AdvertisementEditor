import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.0",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 32.68" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height}">
    <defs>
        <style>.cls-1-0{fill:${cmpConfig.props.color};}.extra-1-0-1{fill:#415a6b;}</style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M35.32,40c-5.51,0-8.44-7.2-11.54-14.81C21.87,20.48,19,13.41,16.72,13.41c-.32,0-3.2.32-6.66,11.63A110.43,110.43,0,0,0,7,38l-4.6-.74A113,113,0,0,1,5.6,23.67c3.07-10,6.71-14.93,11.12-14.93,5.41,0,8.31,7.12,11.38,14.66C30,28.14,33,35.31,35.32,35.31c1.53,0,3.81-2.55,5.62-9.69a69.48,69.48,0,0,0,1.92-12.5h4.67c0,.27-1.3,26.85-12.21,26.85Z" transform="translate(0 -8.57)"/>
    <path class="extra-1-0-1" d="M0,36.51a4.74,4.74,0,1,0,4.74-4.74A4.74,4.74,0,0,0,0,36.51ZM40.9,13.12a4.56,4.56,0,1,0,2.28-3.94A4.54,4.54,0,0,0,40.9,13.12Z" transform="translate(0 -8.57)"/>
</svg>`;
  },
});
