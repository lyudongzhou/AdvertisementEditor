import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.1",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 1.61" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.height};color:${cmpConfig.props.color}">
    <title>未标题-2</title>
    <path style="fill:${cmpConfig.props.color}" d="M50,25H48.39V23.37H50Zm-4.84,0H43.55V23.37h1.61Zm-4.84,0H38.71V23.37h1.61Zm-4.84,0H33.87V23.37h1.61Zm-4.83,0H29V23.37h1.62Zm-4.84,0H24.19V23.37h1.62ZM21,25H19.35V23.37H21Zm-4.84,0H14.52V23.37h1.61Zm-4.84,0H9.68V23.37h1.61ZM6.45,25H4.84V23.37H6.45ZM1.61,25H0V23.37H1.61Z" transform="translate(0 -23.37)"/>
</svg>`;
  },
});
