import { TweenMax, Power1, TimelineMax } from "gsap";
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
  type: "stroll",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        opacity: 0,
        delay: delay,
        aniRotation: -Math.PI,
        ease: Power1.easeOut,
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
  type: "stshake",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const tmx = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    tmx
      .to(cmpConfig, 0.1 * duration, {
        positionX: -10,
        aniRotation: 0.5,
      })
      .to(cmpConfig, 0.1 * duration, {
        positionX: 10,
        aniRotation: -0.3,
      })
      .to(cmpConfig, 0.1 * duration, {
        positionX: -10,
        aniRotation: 0.4,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: -0.2,
        positionX: 10,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: 0.4,
        positionX: -10,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: -0.4,
        positionX: 10,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: 0.3,
        positionX: -10,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: -0.5,
        positionX: 10,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: 0.4,
        positionX: -10,
      })
      .to(cmpConfig, 0.1 * duration, {
        aniRotation: 0,
        positionX: 0,
      });
    var o = {
      tmx: tmx,
      cancel() {
        o.tmx.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "stleftrightfloat",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const tmx = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    tmx
      .to(cmpConfig, 0.33 * duration, {
        positionX: -40,
      })
      .to(cmpConfig, 0.33 * duration, {
        positionX: 40,
      })
      .to(cmpConfig, 0.33 * duration, {
        positionX: 0,
      });
    var o = {
      tmx: tmx,
      cancel() {
        o.tmx.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "stupdownfloat",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const tmy = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    tmy
      .to(cmpConfig, 0.33 * duration, {
        positionY: -40,
      })
      .to(cmpConfig, 0.33 * duration, {
        positionY: 40,
      })
      .to(cmpConfig, 0.33 * duration, {
        positionY: 0,
      });
    var o = {
      tmy: tmy,
      cancel() {
        o.tmy.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});

register(REG_ANIMATIONS, {
  type: "stshine",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const op = cmpConfig.alpha;
    const tmx = new TimelineMax({
      repeat: times - 1,
      delay: delay,
    });
    tmx
      .to(cmpConfig, (1 / 4) * duration, {
        opacity: 0,
      })
      .to(cmpConfig, (1 / 4) * duration, {
        opacity: op,
      })
      .to(cmpConfig, (1 / 4) * duration, {
        opacity: 0,
      })
      .to(cmpConfig, (1 / 4) * duration, {
        opacity: op,
      });
    var o = {
      tmx: tmx,
      cancel() {
        o.tmx.kill();
        cmpConfig.alpha = op;
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "stleftrightbound",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        positionX: cmpConfig.width,
        ease: "elastic.out(1, 0.2)",
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
  type: "stq",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    const o = {
      tween: TweenMax.from(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        aniRotation: 0.2,
        ease: "elastic.out(1, 0.2)",
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
