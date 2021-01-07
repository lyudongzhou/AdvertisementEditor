/* eslint-disable */
(function() {
  var util = {
    css: function(elem, obj) {
      for (var i in obj) {
        elem.style[i] = obj[i];
      }
    },
    hasClass: function(elem, classN) {
      var className = elem.getAttribute("class");
      return className.indexOf(classN) != -1;
    }
  };

  function Colorpicker(opt) {
    if (this === window) throw `Colorpicker: Can't call a function directly`;
    this.init(opt);
  };
  Colorpicker.prototype = {
    init(opt) {
      let {
        el,
        bodyDom,
        palette,
        initColor = "rgb(255,0,0)",
        allMode = ['hex', 'rgb'],
        color = ''
      } = opt;
      var elem = el;
      if (!(elem && elem.nodeType && elem.nodeType === 1)) {
        throw `Colorpicker: not found  ID:${el}  HTMLElement,not ${{}.toString.call(el)}`;
      }
      this.Opt = {
        ...opt,
        el,
        bodyDom,
        palette,
        initColor,
        allMode,
        color
      }
      console.log(bodyDom);
      console.log(bodyDom.offsetWidth, 111);
      this.bindElem = elem;
      this.elem_wrap = null;
      this.fixedBg = null;
      this.elem_colorPancel = null;
      this.elem_picker = null;
      this.elem_barPicker1 = null;
      // this.pancelLeft = 0;
      // this.pancelTop = 0;
      this.downX = 0;
      this.downY = 0;
      this.moveX = 0;
      this.moveY = 0;
      this.pointLeft = 0;
      this.pointTop = 0;
      this.current_mode = 'hex';
      this.rgba = {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      }; // 颜色
      this.hsb = {
        h: 0,
        s: 100,
        b: 100
      }; // 饱和度
      var _this = this,
          rgb = initColor.slice(4, -1).split(",");
      this.rgba.r = parseInt(rgb[0]);
      this.rgba.g = parseInt(rgb[1]);
      this.rgba.b = parseInt(rgb[2]);
      var body = bodyDom,
          div = document.createElement("div");
      div.innerHTML = this.render();
      body.appendChild(div);
      this.elem_wrap = div;
      this.fixedBg = div.children[0];
			// 右侧上方linear面板
      this.elem_colorPancel = div.getElementsByClassName("color-pancel")[0];
      this.pancel_width = this.elem_colorPancel.offsetWidth;
      this.pancel_height = this.elem_colorPancel.offsetHeight;
			// liner面板的圆点取色按钮
      this.elem_picker = div.getElementsByClassName("pickerBtn")[0];
			// 左侧调色版
      this.elem_colorPalette = palette;
			// 右侧中间取饱和度的滑动按钮
			this.elem_barPicker1 = div.getElementsByClassName("colorBar-color-picker")[0];
      var elem = this.bindElem;
      this.bindMovePanel(this.elem_colorPancel, this.setPosition, true);
      this.bindMoveBar(this.elem_barPicker1.parentNode, this.setBar, false);
      this.elem_wrap.addEventListener("input", function(e) {
        var target = e.target,
          value = target.value;
        _this.setColorByInput(value);
      }, false);
      this.elem_colorPalette.addEventListener("click", function(e) {
        if (e.target.tagName.toLocaleLowerCase() == "p") {
          let colorStr = e.target.style.background;
          let rgb = colorStr.slice(4, -1).split(",");
          let rgba = {
            r: parseInt(rgb[0]),
            g: parseInt(rgb[1]),
            b: parseInt(rgb[2])
          }
          switch (_this.current_mode) {
            case "hex":
              _this.setColorByInput("#" + _this.rgbToHex(rgba))
              break;
            case 'rgb':
              let inputs = _this.elem_wrap.getElementsByTagName("input")
              inputs[0].value = rgba.r;
              inputs[1].value = rgba.g;
              inputs[2].value = rgba.b;
              _this.setColorByInput(colorStr)
              break;
          }
          var hex = '#' + _this.rgbToHex(_this.HSBToRGB(_this.hsb));
          _this.Opt.down(hex);
          _this.Opt.up(hex);
        }
      }, false);
      (color != '' && this.setColorByInput(color));
    },
    render: function() {
      var tpl = `
					<div style="box-sizing: initial; width: 244px; display:flex;">
						<div style="width: 199px; height:199px; padding-bottom: 55%; position: relative; border-radius: 2px 2px 0px 0px; overflow: hidden;">
							<div class="color-pancel" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(${this.rgba.r},${this.rgba.g},${this.rgba.b})">
								<style>
									.saturation-white {background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));background: linear-gradient(to right, #fff, rgba(255,255,255,0));}
									.saturation-black {background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));background: linear-gradient(to top, #000, rgba(0,0,0,0));}
								</style>
								<div class="saturation-white" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">
									<div class="saturation-black" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">
									</div>
									<div class="pickerBtn" style="position: absolute; top: 0%; left: 100%; cursor: default;pointer-events:none;">
										<div style="width: 12px; height: 12px; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset; transform: translate(-6px, -6px);">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="flexbox-fix" style="width:20px;height: 199px;margin-left:3px;">
              <div style="height: 100%; position: relative;">
								<div style="position: absolute; top: 0px;right: 0px; bottom: 0px; left: 0px;">
									<div class="hue-horizontal" style="position: relative; height: 100%;">
										<style>
											.hue-horizontal {background: linear-gradient(to bottom, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);background: -webkit-linear-gradient(to bottom, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);}
										</style>
										<div class="colorBar-color-picker" style="position: absolute; left: 0%;">
											<div style="width: 20px; height: 5px; background-color: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;">
											</div>
										</div>
									</div>
								</div>
              </div>
						</div>
					</div>
				</div>`;
      return tpl;
    },
    getInputTpl: function() {
      var current_mode_html = "";
      switch (this.current_mode) {
        case 'hex':
          var hex = "#" + this.rgbToHex(this.HSBToRGB(this.hsb));
          current_mode_html += `
							<div style="padding-left: 6px; width: 100%;">
								<div style="position: relative;">
									<input class="colorpicker-hexInput" value="${hex}" spellcheck="false" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">
									<span style="text-transform: uppercase; font-size: 11px; line-height: 11px; color: rgb(150, 150, 150); text-align: center; display: block; margin-top: 12px;">hex</span>
								</div>
							</div>`;
          break;
        case 'rgb':
          for (var i = 0; i < 3; i++) {
            current_mode_html += `<div style="padding-left: 6px; width: 100%;">
								<div style="position: relative;">
									<input class="colorpicker-hexInput" value="${this.rgba['rgb'[i]]}" spellcheck="false" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">
									<span style="text-transform: uppercase; font-size: 11px; line-height: 11px; color: rgb(150, 150, 150); text-align: center; display: block; margin-top: 12px;">${'rgb'[i]}</span>
								</div>
							</div>`;
          }
          default:
      }
      return current_mode_html;
    },
    setPosition: function (x, y) {
      var LEFT = parseInt(x),
        TOP = parseInt(y);
      this.pointLeft = Math.max(0, Math.min(LEFT<=0?0:LEFT, this.pancel_width));
      this.pointTop = Math.max(0, Math.min(TOP<=0?0:TOP, this.pancel_height));
      util.css(this.elem_picker, {
        left: this.pointLeft + "px",
        top: this.pointTop + "px"
      })
      this.hsb.s = parseInt(100 * this.pointLeft / this.pancel_width);
      this.hsb.b = parseInt(100 * (this.pancel_height - this.pointTop) / this.pancel_height);
      this.setShowColor();
      this.setValue(this.rgba);
    },
    setBar: function(elem, y) {
      var elem_bar = elem.getElementsByTagName("div")[0],
        rect = elem.getBoundingClientRect(),
        elem_height = elem.offsetHeight,
        TOP = parseInt(y),
        Y = Math.max(0, Math.min(TOP<=0?0:TOP, elem_height));
      if (elem_bar === this.elem_barPicker1) {
        util.css(elem_bar, {
          top: Y + "px"
        });
        this.hsb.h = parseInt(360 * Y / elem_height);
      } else {
        util.css(elem_bar, {
          top: Y + "px"
        });
        this.rgba.a = Y / elem_height;
      }
      this.setPancelColor(this.hsb.h);
      this.setShowColor();
      this.setValue(this.rgba);
    },
    setPancelColor: function(h) {
      var rgb = this.HSBToRGB({
        h: h,
        s: 100,
        b: 100
      });
      util.css(this.elem_colorPancel, {
        background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + this.rgba.a + ')'
      });
    },
    setShowColor: function() {
      var rgb = this.HSBToRGB(this.hsb);
      this.rgba.r = rgb.r;
      this.rgba.g = rgb.g;
      this.rgba.b = rgb.b;
    },
    setValue: function(rgb) {
      var hex = "#" + this.rgbToHex(rgb);
      this.Opt.change(this.bindElem, hex);
    },
    setColorByInput: function(value) {
      var _this = this;
      switch (this.current_mode) {
        case "hex":
          value = value.slice(1);
          if (value.length == 3) {
            value = '#' + value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
            this.hsb = this.hexToHsb(value);
          } else if (value.length == 6) {
            this.hsb = this.hexToHsb(value);
          }
          break;
        case 'rgb':
          var inputs = this.elem_wrap.getElementsByTagName("input"),
            rgb = {
              r: inputs[0].value ? parseInt(inputs[0].value) : 0,
              g: inputs[1].value ? parseInt(inputs[1].value) : 0,
              b: inputs[2].value ? parseInt(inputs[2].value) : 0
            };
          this.hsb = this.rgbToHsb(rgb);
      }
      this.changeViewByHsb();
    },
    changeViewByHsb: function() {
      this.pointLeft = parseInt(this.hsb.s * this.pancel_width / 100);
      this.pointTop = parseInt((100 - this.hsb.b) * this.pancel_height / 100);
      util.css(this.elem_picker, {
        left: this.pointLeft + "px",
        top: this.pointTop + "px"
      });
      this.setPancelColor(this.hsb.h);
      this.setShowColor();
      util.css(this.elem_barPicker1, {
        top: this.hsb.h / 360 * (this.elem_barPicker1.parentNode.offsetHeight) + "px"
      });
      var hex = '#' + this.rgbToHex(this.HSBToRGB(this.hsb));
      this.Opt.change(this.bindElem, hex);
    },
    switch_current_mode: function() {
      this.current_mode = this.current_mode == 'hex' ? 'rgb' : 'hex';
    },
    bindMovePanel:function(elem, fn, bool) {
      var _this = this;
      elem.addEventListener("mousedown", function(e) {
        _this.downX = e.offsetX;
        _this.downY = e.offsetY;

        _this.Opt.down();

        bool ? fn.call(_this, _this.downX, _this.downY) : fn.call(_this, elem, _this.downX, _this.downY);
        document.addEventListener("mousemove", mousemove, false);

        function mousemove(e) {
          let bound = _this.elem_colorPancel.getBoundingClientRect()
          _this.moveX = e.clientX-bound.x;
          _this.moveY = e.clientY-bound.y;
          bool ? fn.call(_this, _this.moveX, _this.moveY) : fn.call(_this, elem, _this.moveX, _this.moveY);

          var hex = '#' + _this.rgbToHex(_this.HSBToRGB(_this.hsb));
          _this.Opt.move(hex);

          e.preventDefault();
        }
        document.addEventListener("mouseup", mouseup, false);

        function mouseup(e) {
          document.removeEventListener("mousemove", mousemove, false)
          document.removeEventListener("mouseup", mouseup, false)
          var hex = '#' + _this.rgbToHex(_this.HSBToRGB(_this.hsb));
          _this.Opt.up(hex);
        }
      }, false);
    },
    bindMoveBar: function(elem, fn, bool) {
      var _this = this;
      elem.addEventListener("mousedown", function(e) {
        let rect = e.currentTarget.getBoundingClientRect(),
            offsetY = e.clientY - rect.top;
        _this.downY = offsetY;
        bool ? fn.call(_this, _this.downY) : fn.call(_this, elem, _this.downY);
        _this.Opt.down();

        document.addEventListener("mousemove", mousemove, false);

        function mousemove(e) {
          let bound = elem.getBoundingClientRect();
          _this.moveY = e.clientY-bound.y;
          bool ? fn.call(_this, _this.moveY) : fn.call(_this, elem, _this.moveY);
          var hex = '#' + _this.rgbToHex(_this.HSBToRGB(_this.hsb));
          _this.Opt.move(hex);

          e.preventDefault();
        }
        document.addEventListener("mouseup", mouseup, false);

        function mouseup(e) {
          var hex = '#' + _this.rgbToHex(_this.HSBToRGB(_this.hsb));
          _this.Opt.up(hex);
          document.removeEventListener("mousemove", mousemove, false)
          document.removeEventListener("mouseup", mouseup, false)
        }
      }, false);
    },
    show: function() {
      util.css(this.elem_wrap, {
        "display": "block"
      })
    },
    hide: function() {
      util.css(this.elem_wrap, {
        "display": "none"
      })
    },
    HSBToRGB: function(hsb) {
      var rgb = {};
      var h = Math.round(hsb.h);
      var s = Math.round(hsb.s * 255 / 100);
      var v = Math.round(hsb.b * 255 / 100);
      if (s == 0) {
        rgb.r = rgb.g = rgb.b = v;
      } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if (h == 360) h = 0;
        if (h < 60) {
          rgb.r = t1;
          rgb.b = t2;
          rgb.g = t2 + t3
        } else if (h < 120) {
          rgb.g = t1;
          rgb.b = t2;
          rgb.r = t1 - t3
        } else if (h < 180) {
          rgb.g = t1;
          rgb.r = t2;
          rgb.b = t2 + t3
        } else if (h < 240) {
          rgb.b = t1;
          rgb.r = t2;
          rgb.g = t1 - t3
        } else if (h < 300) {
          rgb.b = t1;
          rgb.g = t2;
          rgb.r = t2 + t3
        } else if (h < 360) {
          rgb.r = t1;
          rgb.g = t2;
          rgb.b = t1 - t3
        } else {
          rgb.r = 0;
          rgb.g = 0;
          rgb.b = 0
        }
      }
      return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
      };
    },
    rgbToHex: function(rgb) {
      var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
      hex.map(function(str, i) {
        if (str.length == 1) {
          hex[i] = '0' + str;
        }
      });
      return hex.join('');
    },
    hexToRgb: function(hex) {
      var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
      return {
        r: hex >> 16,
        g: (hex & 0x00FF00) >> 8,
        b: (hex & 0x0000FF)
      };
    },
    hexToHsb: function(hex) {
      return this.rgbToHsb(this.hexToRgb(hex));
    },
    rgbToHsb: function(rgb) {
      var hsb = {
        h: 0,
        s: 0,
        b: 0
      };
      var min = Math.min(rgb.r, rgb.g, rgb.b);
      var max = Math.max(rgb.r, rgb.g, rgb.b);
      var delta = max - min;
      hsb.b = max;
      hsb.s = max != 0 ? 255 * delta / max : 0;
      if (hsb.s != 0) {
        if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
        else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
        else hsb.h = 4 + (rgb.r - rgb.g) / delta;
      } else hsb.h = -1;
      hsb.h *= 60;
      if (hsb.h < 0) hsb.h += 360;
      hsb.s *= 100 / 255;
      hsb.b *= 100 / 255;
      return hsb;
    }
  }
  Colorpicker.create = function(opt) {
    return new Colorpicker(opt)
  }
  exports.Colorpicker = Colorpicker;

})()
