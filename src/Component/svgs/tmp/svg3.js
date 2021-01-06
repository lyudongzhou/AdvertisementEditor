import {register} from "@/register";
import {SVGS} from "@/const";
register(SVGS,{
  type: "0.2",
  payload: function(cmpConfig) {
    let props = cmpConfig.props;
    return `<svg viewBox="0 0 60 67" xmlns="http://www.w3.org/2000/svg" style="width: ${cmpConfig.layoutConfig.width}; height: ${cmpConfig.layoutConfig.width}; fill: ${props.color};"><g transform="translate(0 0) scale(1 1)">' + '<path xmlns="http://www.w3.org/2000/svg" d="M35.83,11.86a7.42,7.42,0,1,0-11.84,0h0s5.94,6.43,5.94,21.51c0-15.09,5.94-21.51,5.94-21.51Z" style="fill: ${props.color};"></path><path xmlns="http://www.w3.org/2000/svg" d="M14.24,17.48h0A7.42,7.42,0,1,0,8.31,27.75v0s8.54-1.93,21.6,5.61C16.84,25.84,14.24,17.48,14.24,17.48Z" style="fill: ${props.color};"></path><path xmlns="http://www.w3.org/2000/svg" d="M8.3,39v0a7.34,7.34,0,0,0-4.59.92,7.42,7.42,0,1,0,10.51,9.34v0s2.6-8.36,15.66-15.9C16.84,40.92,8.3,39,8.3,39Z" style="fill: ${props.color};"></path><path xmlns="http://www.w3.org/2000/svg" d="M24,54.9a7.42,7.42,0,1,0,11.84,0h0S29.9,48.47,29.9,33.38C29.9,48.47,24,54.89,24,54.89Z" style="fill: ${props.color};"></path><path xmlns="http://www.w3.org/2000/svg" d="M56.1,39.93A7.36,7.36,0,0,0,51.5,39v0S43,40.92,29.9,33.38C43,40.92,45.56,49.28,45.56,49.28h0a7.35,7.35,0,0,0,3.09,3.52A7.42,7.42,0,1,0,56.1,39.93Z" style="fill: ${props.color};"></path><path xmlns="http://www.w3.org/2000/svg" d="M51.51,27.77v0A7.42,7.42,0,1,0,45.58,17.5v0S43,25.84,29.9,33.38C43,25.84,51.51,27.77,51.51,27.77Z" style="fill: ${props.color};"></path>' + '</g></svg>`;
  }
});
