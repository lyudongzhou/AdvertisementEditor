import {register} from "@/register";
import {SVGS} from "@/const";
register(SVGS,{
  type: "0.4",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 43.76" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px">
    <defs>
        <style>.cls-0-4{fill:${cmpConfig.props.color};}</style>
    </defs>
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color};" d="M49.47,22.72,42.65,17v-6.3a1.89,1.89,0,0,0-1.8-1.93H37.43a1.89,1.89,0,0,0-1.8,1.93v.87L27.21,4.76l-.1-.07a3.56,3.56,0,0,0-4.28,0l0,0L.55,22.72a1.48,1.48,0,0,0-.3,2A1.27,1.27,0,0,0,2,25.08L2.1,25l22.24-18a1.09,1.09,0,0,1,1.31,0l0,0L47.9,25a1.27,1.27,0,0,0,1.78-.22l.07-.1a1.48,1.48,0,0,0-.3-2Zm-7.26,2.94L26.79,13a2.88,2.88,0,0,0-3.54,0h0L7.82,25.66a1.47,1.47,0,0,0-.55,1.15v16a4.8,4.8,0,0,0,4.61,5h7.48V35.84A3.68,3.68,0,0,1,22.9,32h3.67a3.69,3.69,0,0,1,3.55,3.81V47.76h8a4.8,4.8,0,0,0,4.62-5v-16a1.49,1.49,0,0,0-.54-1.15Z" transform="translate(0 -4)"/>
</svg>`
  }
});
