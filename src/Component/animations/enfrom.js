import { TweenMax, Power3, Bounce, Elastic, TimelineMax } from "gsap";
import { register } from "@/register";
import { REG_ANIMATIONS } from "@/const";
function resetPara() {
  let resetPara = {
    pivotX: 0,
    pivotY: 0,
    scaleX: 1,
    scaleY: 1,
    aniRotation: 0,
    skewX: 0,
    skewY: 0,
    positionX: 0,
    positionY: 0,
    alpha: 1,
  };
  Object.assign(this, resetPara);
}
register(REG_ANIMATIONS, {
  type: "enfromtop",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        alpha: 0,
        delay: delay,
        positionY: -50,
        ease: Power3.easeIn,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfromright",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    // cmpConfig.alpha = 0;
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        alpha: 0,
        delay: delay,
        positionX: 50,
        ease: Power3.easeIn,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfrombotton",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionY: 50,
        alpha: 0,
        ease: Power3.easeIn,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfromleft",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionX: -50,
        alpha: 0,
        ease: Power3.easeIn,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});

register(REG_ANIMATIONS, {
  type: "enfromleftjump",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionX: -50,
        ease: Bounce.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfromrightjump",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionX: 50,
        ease: Bounce.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfromtopjump",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionY: -50,
        ease: Bounce.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfrombottonjump",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionY: 50,
        ease: Bounce.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
//中心弹入
register(REG_ANIMATIONS, {
  type: "encenterbounds",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        scaleX: cmpConfig.scaleX * 0.5,
        scaleY: cmpConfig.scaleY * 0.5,
        ease: Elastic.easeOut,
        alpha: 0,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
//中心放大
register(REG_ANIMATIONS, {
  type: "encenterscale",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        scaleX: cmpConfig.scaleX * 0.5,
        scaleY: cmpConfig.scaleY * 0.5,
        ease: Power3.easeOut,
        alpha: 0,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
//翻滚进入
register(REG_ANIMATIONS, {
  type: "enrollin",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        ease: Power3.easeOut,
        aniRotation: Math.PI,
        positionX: cmpConfig.width,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enlightspeedin",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const tm = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    cmpConfig.alpha = 0;
    cmpConfig.skewX = -30 * (Math.PI / 180);
    cmpConfig.positionX = -cmpConfig.width;
    tm.to(cmpConfig, 0.6 * duration, {
      skewX: 20 * (Math.PI / 180),
      positionX: -0.8 * cmpConfig.width,
    })
      .to(cmpConfig, 0.2 * duration, {
        alpha: 1,
        skewX: -5 * (Math.PI / 180),
        positionX: 0,
      })
      .to(cmpConfig, 0.2 * duration, {
        skewX: 0,
      });
    // tm.to(cmpConfig,0.8*duration,{positionX:50}).to(cmpConfig,0.2*duration,{positionX:0});
    var o = {
      tm: tm,
      cancel() {
        o.tm.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enmagic",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const tm = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    let op = 1;
    cmpConfig.alpha = 0;
    cmpConfig.pivotX = -0.5 * cmpConfig.width;
    cmpConfig.pivotY = -0.5 * cmpConfig.height;
    cmpConfig.positionX = -0.5 * cmpConfig.width;
    cmpConfig.positionY = 0.5 * cmpConfig.height;
    cmpConfig.scaleX = 0;
    cmpConfig.scaleY = 0;
    cmpConfig.aniRotation = 2 * Math.PI;
    tm.to(cmpConfig, 0.3 * duration, {}).to(cmpConfig, 0.7 * duration, {
      alpha: op,
      pivotX: 0,
      pivotY: 0,
      scaleX: 1,
      scaleY: 1,
      aniRotation: 0,
      positionX: 0,
      positionY: 0,
    });
    // tm.to(cmpConfig,0.8*duration,{positionX:50}).to(cmpConfig,0.2*duration,{positionX:0});
    var o = {
      tm: tm,
      cancel() {
        o.tm.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "ensmallbound",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        ease: Bounce.easeOut,
        alpha: 0,
        scaleX: 1.5,
        scaleY: 1.5,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enroutate",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const tm = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    cmpConfig.alpha = 0;
    cmpConfig.pivotX = cmpConfig.width;
    cmpConfig.pivotY = -0.5 * cmpConfig.height;
    cmpConfig.positionX = -0.5 * cmpConfig.width;
    cmpConfig.positionY = 0.5 * cmpConfig.height;
    cmpConfig.scaleX = 0;
    cmpConfig.scaleY = 0;
    cmpConfig.aniRotation = -2 * Math.PI;
    tm.to(cmpConfig, 0.3 * duration, {}).to(cmpConfig, 0.7 * duration, {
      alpha: 1,
      pivotX: 0,
      pivotY: 0,
      scaleX: 1,
      scaleY: 1,
      aniRotation: 0,
      positionX: 0,
      positionY: 0,
    });
    // tm.to(cmpConfig,0.8*duration,{positionX:50}).to(cmpConfig,0.2*duration,{positionX:0});
    var o = {
      tm: tm,
      cancel() {
        o.tm.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "enfade",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        ease: Power3.easeInOut,
        alpha: 0,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
