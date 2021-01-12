import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "0.1",
  payload: function(cmpConfig) {
    // let props = cmpConfig.props;
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 43.27" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height}">
    <defs>
        <style>.cls-0-1{fill:#${cmpConfig.props.color};}</style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M38.76,16.67l-1-13.22.07.08L49.47,16.74H38.82ZM27.12,3.45H37.77l.82,13.06Zm-13,13.29L25,4.49l.06.07L35.66,16.74Zm-2.87-.23v.23H.29L12.14,3.45H22.79L11.31,16.36a.19.19,0,0,0-.08.15Zm1.08,2.7L22.77,46.72,0,19.06H12.25Zm22.79-.15-.12.32L25,45.6,14.82,19.06Zm14.9,0L27.08,46.71,37.59,19.06Z" transform="translate(0 -3.45)"/>
</svg>`;
  },
});
