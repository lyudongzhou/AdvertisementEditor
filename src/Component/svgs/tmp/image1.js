import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "3.0",
  payload: function(cmpConfig) {
    return `
    <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 49.77" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px">
    <defs>
        <style>.cls-3-0{fill:#dd684f;}</style>
    </defs>
    <path class="cls-3-0" d="M23.5,39.19a19.32,19.32,0,0,0,16.27-9.47,26.38,26.38,0,0,0,1.74-20.4A3.56,3.56,0,0,0,37.09,6.8l-.31.11L31.15,9.15A42,42,0,0,0,24.23.65a2.4,2.4,0,0,0-2.84,0,41.69,41.69,0,0,0-7,8.5L8.83,6.87a3.55,3.55,0,0,0-4.66,2c0,.13-.09.26-.13.39a26.39,26.39,0,0,0,1.74,20.4,19.22,19.22,0,0,0,17,9.47ZM35.85,49.92a6.17,6.17,0,0,0,1.65-.31c2.14-.44,5.88-2.55,6.49-11.22a1.36,1.36,0,0,0-.29-1,.82.82,0,0,0-.7-.3c-2.86,0-10.93,1.21-13.06,4.86a4.2,4.2,0,0,0,0,4.25A7,7,0,0,0,35.85,49.92ZM3,37.27a.91.91,0,0,0-.65.44,1.36,1.36,0,0,0-.29,1c.61,8.67,4.3,10.76,6.49,11.22a7.06,7.06,0,0,0,1.3,0A7,7,0,0,0,16,46.38a4.2,4.2,0,0,0,0-4.25C13.69,38.48,5.65,37.27,3,37.27Z" transform="translate(-2 -0.18)"/>
</svg>`;
  },
});
register(SVGS, {
  type: "3.1",
  payload: function(cmpConfig) {
    return `
    <svg  style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.66 45.03">
    <defs>
        <style>.cls-3-1{fill:#5855c8;}</style>
    </defs>
    <path class="cls-3-1" d="M46,3H3.64A3.41,3.41,0,0,0,0,6.28V35.42a3.67,3.67,0,0,0,3.64,3.64h9.6a1.79,1.79,0,0,1,1.33,3l-3.31,3.31A1.81,1.81,0,0,0,12.91,48H37.08a1.81,1.81,0,0,0,1.66-2.65L35.43,42a1.78,1.78,0,0,1,1.32-3H46a3.67,3.67,0,0,0,3.64-3.64V6.28A3.61,3.61,0,0,0,46,3Zm-5,29.14H7.61a1.86,1.86,0,0,1-1.65-2,1.56,1.56,0,0,1,1.65-1.65H41.05a1.56,1.56,0,0,1,1.66,1.65A1.86,1.86,0,0,1,41.05,32.11Z" transform="translate(0 -2.97)"/>
</svg>`;
  },
});
register(SVGS, {
  type: "3.2",
  payload: function(cmpConfig) {
    return `
    <svg style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 49.33">
    <defs>
        <style>.cls-3-2{fill:#b12621;}</style>
    </defs>
    <path class="cls-3-2" d="M32.75,6.42H14.25A3.09,3.09,0,0,0,11.17,9.5V32.63a3.09,3.09,0,0,0,3.08,3.08h18.5a3.09,3.09,0,0,0,3.08-3.08V9.5A3.09,3.09,0,0,0,32.75,6.42ZM35.83.25H11.17A6.19,6.19,0,0,0,5,6.42v37a6.19,6.19,0,0,0,6.17,6.17H35.83A6.19,6.19,0,0,0,42,43.42v-37A6.19,6.19,0,0,0,35.83.25Zm3.09,43.17a3.09,3.09,0,0,1-3.09,3.08H11.17a3.09,3.09,0,0,1-3.09-3.08v-37a3.09,3.09,0,0,1,3.09-3.08H35.83a3.09,3.09,0,0,1,3.09,3.08ZM24.27,38.8a2.31,2.31,0,1,0,2.31,2.31A2.36,2.36,0,0,0,24.27,38.8Z" transform="translate(-5 -0.25)"/>
</svg>`;
  },
});
register(SVGS, {
  type: "3.3",
  payload: function(cmpConfig) {
    return `
    <svg 
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 49.95" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px">
    <defs>
        <style>.cls-3-3{fill:#f9a326;}</style>
    </defs>
    <path class="cls-3-3" d="M8,34.22V16.65C8,7.18,11,.22,23.53.22c10.8,0,14.36,4.38,14.36,12.47,0,.3.07.6.07.84H27c0-3.89-.28-5.75-3.42-5.75s-3.76,2.1-3.76,9.65v4.32c1.12-1.68,3.83-2.58,7-2.7C35.73,18.87,39,25.11,39,33c0,10.19-3.55,17.15-15.4,17.15C12.53,50.17,8,43.46,8,34.22Zm19.3.36c0-4.74-.07-7.86-3.7-7.86a4.81,4.81,0,0,0-3.76,1.92v7.92c0,3.3.77,6.23,3.9,6.23S27.3,40,27.3,34.58Z" transform="translate(-8 -0.22)"/>
</svg>`;
  },
});
register(SVGS, {
  type: "3.4",
  payload: function(cmpConfig) {
    return `
    <svg 
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46.9" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px">
    <defs>
        <style>.cls-3-4{fill:#f9a326;}</style>
    </defs>
    <path class="cls-3-4" d="M21.15.21h9.7L49,47.11H37.36L33.93,37H18.07L14.64,47.11H3Zm4.91,13.51h-.23l-5.71,17H31.76Z" transform="translate(-3 -0.21)"/>
</svg>`;
  },
});
