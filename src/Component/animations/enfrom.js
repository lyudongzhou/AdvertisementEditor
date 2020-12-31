import { TweenMax, Power3 ,Bounce} from "gsap";
import { register } from "@/register";
import {REG_ANIMATIONS} from "@/const";
register(REG_ANIMATIONS,{
    type: "enfromtop",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.top;
        const op = cmpConfig.opacity;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, top: cmpConfig.top - 50,opacity:0, ease: Power3.easeIn }),
            cancel() {
                o.tween.kill();
                cmpConfig.top = begin;
                cmpConfig.opacity = op;
            }
        }
        return o;
    }
});
register(REG_ANIMATIONS,{
    type: "enfromright",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.left;
        const op = cmpConfig.opacity;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, left: cmpConfig.left + 50,opacity:0, ease: Power3.easeIn }),
            cancel() {
                o.tween.kill();
                cmpConfig.left = begin;
                cmpConfig.opacity = op;
            }
        }
        return o;
    }
});
register(REG_ANIMATIONS,{
    type: "enfrombotton",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.top;
        const op = cmpConfig.opacity;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, top: cmpConfig.top + 50,opacity:0, ease: Power3.easeIn }),
            cancel() {
                o.tween.kill();
                cmpConfig.top = begin;
                cmpConfig.opacity = op;
            }
        }
        return o;
    }
});
register(REG_ANIMATIONS,{
    type: "enfromleft",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.left;
        const op = cmpConfig.opacity;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, left: cmpConfig.left - 50,opacity:0, ease: Power3.easeIn }),
            cancel() {
                o.tween.kill();
                cmpConfig.left = begin;
                cmpConfig.opacity = op;
            }
        }
        return o;
    }
});

register(REG_ANIMATIONS,{
    type: "enfromleftjump",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.left;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, left: cmpConfig.left - 50, ease: Bounce.easeOut }),
            cancel() {
                o.tween.kill();
                cmpConfig.left = begin;
            }
        }
        return o;
    }
});
register(REG_ANIMATIONS,{
    type: "enfromrightjump",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.left;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, left: cmpConfig.left + 50, ease: Bounce.easeOut }),
            cancel() {
                o.tween.kill();
                cmpConfig.left = begin;
            }
        }
        return o;
    }
});
register(REG_ANIMATIONS,{
    type: "enfromtopjump",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.top;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, top: cmpConfig.top - 50, ease: Bounce.easeOut }),
            cancel() {
                o.tween.kill();
                cmpConfig.top = begin;
            }
        }
        return o;
    }
});
register(REG_ANIMATIONS,{
    type: "enfrombottonjump",
    payload(cmpConfig, { duration, delay, times }) {
        const begin = cmpConfig.top;
        const o = {
            tween: TweenMax.from(cmpConfig, duration, { repeat: times - 1, delay: delay, top: cmpConfig.top + 50, ease: Bounce.easeOut }),
            cancel() {
                o.tween.kill();
                cmpConfig.top = begin;
            }
        }
        return o;
    }
});