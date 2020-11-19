import { TweenMax, Power3 } from "gsap";
export function fromtop(cmpConfig, { duration, delay, times }) {
    const begin = cmpConfig.top;
    const o = {
        tween: TweenMax.from(cmpConfig, duration / 1000, { repeat: times - 1, delay: delay / 1000, top: cmpConfig.top - 50, ease: Power3.easeIn }),
        cancel() {
            cmpConfig.top = begin;
        }
    }
    return o;
}