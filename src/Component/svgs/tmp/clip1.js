import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "3.1",
  payload: function(cmpConfig) {
    return `<svg id="图层_1" data-name="图层 1"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 49.77">
    <defs>
        <style>.cls-1{fill:#dd684f;}</style>
    </defs>
    <title>未标题-2</title>
    <defs>
        <clipPath id="clip1" style="transform:">
            <path class="cls-1" d="M23.5,39.19a19.32,19.32,0,0,0,16.27-9.47,26.38,26.38,0,0,0,1.74-20.4A3.56,3.56,0,0,0,37.09,6.8l-.31.11L31.15,9.15A42,42,0,0,0,24.23.65a2.4,2.4,0,0,0-2.84,0,41.69,41.69,0,0,0-7,8.5L8.83,6.87a3.55,3.55,0,0,0-4.66,2c0,.13-.09.26-.13.39a26.39,26.39,0,0,0,1.74,20.4,19.22,19.22,0,0,0,17,9.47ZM35.85,49.92a6.17,6.17,0,0,0,1.65-.31c2.14-.44,5.88-2.55,6.49-11.22a1.36,1.36,0,0,0-.29-1,.82.82,0,0,0-.7-.3c-2.86,0-10.93,1.21-13.06,4.86a4.2,4.2,0,0,0,0,4.25A7,7,0,0,0,35.85,49.92ZM3,37.27a.91.91,0,0,0-.65.44,1.36,1.36,0,0,0-.29,1c.61,8.67,4.3,10.76,6.49,11.22a7.06,7.06,0,0,0,1.3,0A7,7,0,0,0,16,46.38a4.2,4.2,0,0,0,0-4.25C13.69,38.48,5.65,37.27,3,37.27Z" transform="translate(-2 -0.18)"/>
        </clipPath>
    </defs>
    <g clip-path="url(#clip1)">
        <image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${cmpConfig.props.url}" width="333.4219435736677" height="166.19" transform="translate(-20.270971786833854 0)"></image>
    </g>
</svg>`;
  },
});
