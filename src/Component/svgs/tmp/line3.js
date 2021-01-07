import { register } from "@/register";
import { SVGS } from "@/const";
register(SVGS, {
  type: "1.2",
  payload: function(cmpConfig) {
    let props = cmpConfig.props;
    return `<svg viewBox="0 0 300 4.5" xmlns="http://www.w3.org/2000/svg" style="width: ${cmpConfig.layoutConfig.width}px; height: ${cmpConfig.layoutConfig.height}px; ${props.color};"><g>' + '<path xmlns="http://www.w3.org/2000/svg" d="M195.23,3a3.8,3.8,0,0,1-2.71-1.12,2.85,2.85,0,0,0-4.13,0A3.8,3.8,0,0,1,185.69,3,3.79,3.79,0,0,1,183,1.88a2.85,2.85,0,0,0-4.12,0A3.79,3.79,0,0,1,176.16,3a3.79,3.79,0,0,1-2.7-1.12,2.85,2.85,0,0,0-4.12,0A3.79,3.79,0,0,1,166.63,3a3.79,3.79,0,0,1-2.7-1.12,2.85,2.85,0,0,0-4.12,0A3.79,3.79,0,0,1,157.1,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,147.58,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,138.05,3a3.79,3.79,0,0,1-2.7-1.12,2.85,2.85,0,0,0-4.12,0A3.79,3.79,0,0,1,128.53,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,119,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,109.47,3a3.79,3.79,0,0,1-2.7-1.12,2.85,2.85,0,0,0-4.12,0A3.79,3.79,0,0,1,100,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,90.43,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,80.91,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,71.38,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,61.87,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,52.34,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.11,0A3.78,3.78,0,0,1,42.83,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,33.31,3a3.78,3.78,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.11,0A3.79,3.79,0,0,1,23.79,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.11,0A3.79,3.79,0,0,1,14.28,3a3.79,3.79,0,0,1-2.7-1.12,2.84,2.84,0,0,0-4.12,0A3.79,3.79,0,0,1,4.76,3a3.79,3.79,0,0,1-2.7-1.12A2.84,2.84,0,0,0,0,1V0A3.79,3.79,0,0,1,2.7,1.12,2.84,2.84,0,0,0,4.76,2a2.84,2.84,0,0,0,2.06-.88,3.82,3.82,0,0,1,5.4,0A2.84,2.84,0,0,0,14.28,2a2.84,2.84,0,0,0,2.06-.88,3.82,3.82,0,0,1,5.4,0A2.83,2.83,0,0,0,23.79,2a2.83,2.83,0,0,0,2.06-.88,3.82,3.82,0,0,1,5.4,0A2.84,2.84,0,0,0,33.31,2a2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0A2.84,2.84,0,0,0,42.83,2a2.84,2.84,0,0,0,2.06-.88,3.82,3.82,0,0,1,5.4,0A2.84,2.84,0,0,0,52.34,2a2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0A2.84,2.84,0,0,0,61.87,2a2.84,2.84,0,0,0,2.06-.88,3.82,3.82,0,0,1,5.4,0A2.84,2.84,0,0,0,71.38,2a2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0A2.84,2.84,0,0,0,80.91,2,2.84,2.84,0,0,0,83,1.12a3.82,3.82,0,0,1,5.4,0A2.84,2.84,0,0,0,90.43,2a2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0A2.84,2.84,0,0,0,100,2,2.84,2.84,0,0,0,102,1.12a3.83,3.83,0,0,1,5.41,0,2.84,2.84,0,0,0,2.06.88,2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0A2.85,2.85,0,0,0,119,2a2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0,2.85,2.85,0,0,0,2.06.88,2.85,2.85,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.41,0,2.84,2.84,0,0,0,2.06.88,2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0,2.84,2.84,0,0,0,2.06.88,2.84,2.84,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.4,0A2.84,2.84,0,0,0,157.1,2a2.85,2.85,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.41,0,2.85,2.85,0,0,0,2.06.88,2.85,2.85,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.41,0,2.84,2.84,0,0,0,2.06.88,2.85,2.85,0,0,0,2.06-.88,3.83,3.83,0,0,1,5.41,0,2.85,2.85,0,0,0,2.06.88,2.85,2.85,0,0,0,2.06-.88,3.84,3.84,0,0,1,5.41,0,2.85,2.85,0,0,0,2.06.88,2.85,2.85,0,0,0,2.07-.88A3.8,3.8,0,0,1,200,0V1a2.85,2.85,0,0,0-2.06.88A3.8,3.8,0,0,1,195.23,3Z" style="${props.color};"></path>' + '</g></svg>`;
  },
});