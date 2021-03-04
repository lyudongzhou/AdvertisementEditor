/**
 * Created by xudao on 16/9/12.
 */
/* eslint-disable */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["exports"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // Node, CommonJS-like
    factory(module.exports);
  } else {
    factory(root);
  }
})(this, function(exports) {
  "use strict";

  // transition.prototype.option = {
  //   $main: "",
  //   $pages: "",
  //   pagesCount: 0,
  //   current: 0,
  //   isAnimating: false,
  //   endCurrPage: false,
  //   endNextPage: false,
  //   loop: true,
  //   callback: null,
  // };
  transition.prototype.init = function(option) {
    this.option = {
      $main: "",
      $pages: "",
      pagesCount: 0,
      current: 0,
      isAnimating: false,
      endCurrPage: false,
      endNextPage: false,
      loop: true,
      callback: null,
    };
    this.option.$main = option.$main;
    this.option.$pages = option.$main.children(".pt-page");
    this.option.pagesCount = this.option.$pages.length;
    this.option.current = option.current ? option.current : 0;
    this.option.callback = option.callback ? option.callback : null;
    this.option.loop = option.loop != undefined ? option.loop : true;
    this.option.$pages.each(function() {
      var $page = $(this);
      $page.data("originalClassList", $page.attr("class"));
    });

    this.option.$pages.eq(this.option.current).addClass("pt-page-current");
  };

  transition.prototype.chooseAnimation = function(animation) {
    var outClass, inClass;
    switch (animation) {
      case 1:
        outClass = "pt-page-moveToLeft";
        inClass = "pt-page-moveFromRight";
        break;
      case 2:
        outClass = "pt-page-moveToRight";
        inClass = "pt-page-moveFromLeft";
        break;
      case 3:
        outClass = "pt-page-moveToTop";
        inClass = "pt-page-moveFromBottom";
        break;
      case 4:
        outClass = "pt-page-moveToBottom";
        inClass = "pt-page-moveFromTop";
        break;
      case 5:
        outClass = "pt-page-fade";
        inClass = "pt-page-moveFromRight pt-page-ontop";
        break;
      case 6:
        outClass = "pt-page-fade";
        inClass = "pt-page-moveFromLeft pt-page-ontop";
        break;
      case 7:
        outClass = "pt-page-fade";
        inClass = "pt-page-moveFromBottom pt-page-ontop";
        break;
      case 8:
        outClass = "pt-page-fade";
        inClass = "pt-page-moveFromTop pt-page-ontop";
        break;
      case 9:
        outClass = "pt-page-moveToLeftFade";
        inClass = "pt-page-moveFromRightFade";
        break;
      case 10:
        outClass = "pt-page-moveToRightFade";
        inClass = "pt-page-moveFromLeftFade";
        break;
      case 11:
        outClass = "pt-page-moveToTopFade";
        inClass = "pt-page-moveFromBottomFade";
        break;
      case 12:
        outClass = "pt-page-moveToBottomFade";
        inClass = "pt-page-moveFromTopFade";
        break;
      case 13:
        outClass = "pt-page-moveToLeftEasing pt-page-ontop";
        inClass = "pt-page-moveFromRight";
        break;
      case 14:
        outClass = "pt-page-moveToRightEasing pt-page-ontop";
        inClass = "pt-page-moveFromLeft";
        break;
      case 15:
        outClass = "pt-page-moveToTopEasing pt-page-ontop";
        inClass = "pt-page-moveFromBottom";
        break;
      case 16:
        outClass = "pt-page-moveToBottomEasing pt-page-ontop";
        inClass = "pt-page-moveFromTop";
        break;
      case 17:
        outClass = "pt-page-scaleDown";
        inClass = "pt-page-moveFromRight pt-page-ontop";
        break;
      case 18:
        outClass = "pt-page-scaleDown";
        inClass = "pt-page-moveFromLeft pt-page-ontop";
        break;
      case 19:
        outClass = "pt-page-scaleDown";
        inClass = "pt-page-moveFromBottom pt-page-ontop";
        break;
      case 20:
        outClass = "pt-page-scaleDown";
        inClass = "pt-page-moveFromTop pt-page-ontop";
        break;
      case 21:
        outClass = "pt-page-scaleDown";
        inClass = "pt-page-scaleUpDown pt-page-delay300";
        break;
      case 22:
        outClass = "pt-page-scaleDownUp";
        inClass = "pt-page-scaleUp pt-page-delay300";
        break;
      case 23:
        outClass = "pt-page-moveToLeft pt-page-ontop";
        inClass = "pt-page-scaleUp";
        break;
      case 24:
        outClass = "pt-page-moveToRight pt-page-ontop";
        inClass = "pt-page-scaleUp";
        break;
      case 25:
        outClass = "pt-page-moveToTop pt-page-ontop";
        inClass = "pt-page-scaleUp";
        break;
      case 26:
        outClass = "pt-page-moveToBottom pt-page-ontop";
        inClass = "pt-page-scaleUp";
        break;
      case 27:
        outClass = "pt-page-scaleDownCenter";
        inClass = "pt-page-scaleUpCenter pt-page-delay400";
        break;
      case 28:
        outClass = "pt-page-rotateRightSideFirst";
        inClass = "pt-page-moveFromRight pt-page-delay200 pt-page-ontop";
        break;
      case 29:
        outClass = "pt-page-rotateLeftSideFirst";
        inClass = "pt-page-moveFromLeft pt-page-delay200 pt-page-ontop";
        break;
      case 30:
        outClass = "pt-page-rotateTopSideFirst";
        inClass = "pt-page-moveFromTop pt-page-delay200 pt-page-ontop";
        break;
      case 31:
        outClass = "pt-page-rotateBottomSideFirst";
        inClass = "pt-page-moveFromBottom pt-page-delay200 pt-page-ontop";
        break;
      case 32:
        outClass = "pt-page-flipOutRight";
        inClass = "pt-page-flipInLeft pt-page-delay500";
        break;
      case 33:
        outClass = "pt-page-flipOutLeft";
        inClass = "pt-page-flipInRight pt-page-delay500";
        break;
      case 34:
        outClass = "pt-page-flipOutTop";
        inClass = "pt-page-flipInBottom pt-page-delay500";
        break;
      case 35:
        outClass = "pt-page-flipOutBottom";
        inClass = "pt-page-flipInTop pt-page-delay500";
        break;
      case 36:
        outClass = "pt-page-rotateFall pt-page-ontop";
        inClass = "pt-page-scaleUp";
        break;
      case 37:
        outClass = "pt-page-rotateOutNewspaper";
        inClass = "pt-page-rotateInNewspaper pt-page-delay500";
        break;
      case 38:
        outClass = "pt-page-rotatePushLeft";
        inClass = "pt-page-moveFromRight";
        break;
      case 39:
        outClass = "pt-page-rotatePushRight";
        inClass = "pt-page-moveFromLeft";
        break;
      case 40:
        outClass = "pt-page-rotatePushTop";
        inClass = "pt-page-moveFromBottom";
        break;
      case 41:
        outClass = "pt-page-rotatePushBottom";
        inClass = "pt-page-moveFromTop";
        break;
      case 42:
        outClass = "pt-page-rotatePushLeft";
        inClass = "pt-page-rotatePullRight pt-page-delay180";
        break;
      case 43:
        outClass = "pt-page-rotatePushRight";
        inClass = "pt-page-rotatePullLeft pt-page-delay180";
        break;
      case 44:
        outClass = "pt-page-rotatePushTop";
        inClass = "pt-page-rotatePullBottom pt-page-delay180";
        break;
      case 45:
        outClass = "pt-page-rotatePushBottom";
        inClass = "pt-page-rotatePullTop pt-page-delay180";
        break;
      case 46:
        outClass = "pt-page-rotateFoldLeft";
        inClass = "pt-page-moveFromRightFade";
        break;
      case 47:
        outClass = "pt-page-rotateFoldRight";
        inClass = "pt-page-moveFromLeftFade";
        break;
      case 48:
        outClass = "pt-page-rotateFoldTop";
        inClass = "pt-page-moveFromBottomFade";
        break;
      case 49:
        outClass = "pt-page-rotateFoldBottom";
        inClass = "pt-page-moveFromTopFade";
        break;
      case 50:
        outClass = "pt-page-moveToRightFade";
        inClass = "pt-page-rotateUnfoldLeft";
        break;
      case 51:
        outClass = "pt-page-moveToLeftFade";
        inClass = "pt-page-rotateUnfoldRight";
        break;
      case 52:
        outClass = "pt-page-moveToBottomFade";
        inClass = "pt-page-rotateUnfoldTop";
        break;
      case 53:
        outClass = "pt-page-moveToTopFade";
        inClass = "pt-page-rotateUnfoldBottom";
        break;
      case 54:
        outClass = "pt-page-rotateRoomLeftOut pt-page-ontop";
        inClass = "pt-page-rotateRoomLeftIn";
        break;
      case 55:
        outClass = "pt-page-rotateRoomRightOut pt-page-ontop";
        inClass = "pt-page-rotateRoomRightIn";
        break;
      case 56:
        outClass = "pt-page-rotateRoomTopOut pt-page-ontop";
        inClass = "pt-page-rotateRoomTopIn";
        break;
      case 57:
        outClass = "pt-page-rotateRoomBottomOut pt-page-ontop";
        inClass = "pt-page-rotateRoomBottomIn";
        break;
      case 58:
        outClass = "pt-page-rotateCubeLeftOut pt-page-ontop";
        inClass = "pt-page-rotateCubeLeftIn";
        break;
      case 59:
        outClass = "pt-page-rotateCubeRightOut pt-page-ontop";
        inClass = "pt-page-rotateCubeRightIn";
        break;
      case 60:
        outClass = "pt-page-rotateCubeTopOut pt-page-ontop";
        inClass = "pt-page-rotateCubeTopIn";
        break;
      case 61:
        outClass = "pt-page-rotateCubeBottomOut pt-page-ontop";
        inClass = "pt-page-rotateCubeBottomIn";
        break;
      case 62:
        outClass = "pt-page-rotateCarouselLeftOut pt-page-ontop";
        inClass = "pt-page-rotateCarouselLeftIn";
        break;
      case 63:
        outClass = "pt-page-rotateCarouselRightOut pt-page-ontop";
        inClass = "pt-page-rotateCarouselRightIn";
        break;
      case 64:
        outClass = "pt-page-rotateCarouselTopOut pt-page-ontop";
        inClass = "pt-page-rotateCarouselTopIn";
        break;
      case 65:
        outClass = "pt-page-rotateCarouselBottomOut pt-page-ontop";
        inClass = "pt-page-rotateCarouselBottomIn";
        break;
      case 66:
        outClass = "pt-page-rotateSidesOut";
        inClass = "pt-page-rotateSidesIn pt-page-delay200";
        break;
      case 67:
        outClass = "pt-page-rotateSlideOut";
        inClass = "pt-page-rotateSlideIn";
        break;
      //立体旋转，上下
      case 68:
        outClass = "pt-page-cvbeOutUp";
        inClass = "pt-page-cvbeInDown";
        break;
      case 69:
        outClass = "pt-page-cvbeOutDown";
        inClass = "pt-page-cvbeInUp";
        break;
      //立体旋转，左右
      case 70:
        outClass = "pt-page-cvbeOutLeft";
        inClass = "pt-page-cvbeInRight";
        break;
      case 71:
        outClass = "pt-page-cvbeOutRight";
        inClass = "pt-page-cvbeInLeft";
        break;
      //普通，上下
      case 72:
        outClass = "pt-page-moveOutUp";
        inClass = "pt-page-moveInDown";
        break;
      case 73:
        outClass = "pt-page-moveOutDown";
        inClass = "pt-page-moveInUp";
        break;
      //普通，左右
      case 74:
        outClass = "pt-page-moveOutLeft";
        inClass = "pt-page-moveInRight";
        break;
      case 75:
        outClass = "pt-page-moveOutRight";
        inClass = "pt-page-moveInLeft";
        break;
      //渐显，上下
      case 76:
        outClass = "pt-page-fadeOutUp";
        inClass = "pt-page-fadeInDown";
        break;
      case 77:
        outClass = "pt-page-fadeOutDown";
        inClass = "pt-page-fadeInUp";
        break;
      //渐显，左右
      case 78:
        outClass = "pt-page-fadeOutLeft";
        inClass = "pt-page-fadeInRight";
        break;
      case 79:
        outClass = "pt-page-fadeOutRight";
        inClass = "pt-page-fadeInLeft";
        break;
      //覆盖，上下
      case 80:
        outClass = "pt-page-coverOutUp";
        inClass = "pt-page-coverInDown";
        break;
      case 81:
        outClass = "pt-page-coverOutDown";
        inClass = "pt-page-coverInUp";
        break;
      //覆盖，左右
      case 82:
        outClass = "pt-page-coverOutLeft";
        inClass = "pt-page-coverInRight";
        break;
      case 83:
        outClass = "pt-page-coverOutRight";
        inClass = "pt-page-coverInLeft";
        break;
      //层叠，上下
      case 84:
        outClass = "pt-page-carouselOutUp";
        inClass = "pt-page-carouselInDown";
        break;
      case 85:
        outClass = "pt-page-carouselOutDown";
        inClass = "pt-page-carouselInUp";
        break;
      //层叠，左右
      case 86:
        outClass = "pt-page-carouselOutLeft";
        inClass = "pt-page-carouselInRight";
        break;
      case 87:
        outClass = "pt-page-carouselOutRight";
        inClass = "pt-page-carouselInLeft";
        break;
      //覆盖缩小，上下
      case 88:
        outClass = "pt-page-scaleOutUp";
        inClass = "pt-page-scaleInDown";
        break;
      case 89:
        outClass = "pt-page-scaleOutDown";
        inClass = "pt-page-scaleInUp";
        break;
      //覆盖缩小，左右
      case 90:
        outClass = "pt-page-scaleOutLeft";
        inClass = "pt-page-scaleInRight";
        break;
      case 91:
        outClass = "pt-page-scaleOutRight";
        inClass = "pt-page-scaleInLeft";
        break;
      //缩放层叠，上下
      case 92:
        outClass = "pt-page-glueOutUp";
        inClass = "pt-page-glueInDown";
        break;
      case 93:
        outClass = "pt-page-glueOutDown";
        inClass = "pt-page-glueInUp";
        break;
      //缩放层叠，左右
      case 94:
        outClass = "pt-page-glueOutLeft";
        inClass = "pt-page-glueInRight";
        break;
      case 95:
        outClass = "pt-page-glueOutRight";
        inClass = "pt-page-glueInLeft";
        break;
      //扇形翻页，上下
      case 96:
        outClass = "pt-page-pushOutUp";
        inClass = "pt-page-pushInDown";
        break;
      case 97:
        outClass = "pt-page-pushOutDown";
        inClass = "pt-page-pushInUp";
        break;
      //扇形翻页，左右
      case 98:
        outClass = "pt-page-pushOutLeft";
        inClass = "pt-page-pushInRight";
        break;
      case 99:
        outClass = "pt-page-pushOutRight";
        inClass = "pt-page-pushInLeft";
        break;
    }

    return { outClass: outClass, inClass: inClass };
  };

  transition.prototype.prevPage = function(animation) {
    if (this.option.isAnimating) {
      return false;
    }

    this.option.isAnimating = true;
    var $currPage = this.option.$pages.eq(this.option.current);
    if (this.option.current > 0) {
      --this.option.current;
    } else if (this.option.current <= 0 && this.option.loop) {
      this.option.current = this.option.pagesCount - 1;
    } else {
      return false;
    }
    var self = this;
    var animateWork = self.chooseAnimation(animation);
    var $nextPage = this.option.$pages
        .eq(this.option.current)
        .addClass("pt-page-current"),
      outClass = animateWork.outClass,
      inClass = animateWork.inClass;
    $currPage.addClass(outClass).on("webkitAnimationEnd", function() {
      $currPage.off("webkitAnimationEnd");
      self.option.endCurrPage = true;
      if (self.option.endNextPage) {
        self.onEndAnimation($currPage, $nextPage);
      }
    });

    $nextPage.addClass(inClass).on("webkitAnimationEnd", function() {
      $nextPage.off("webkitAnimationEnd");
      self.option.endNextPage = true;
      if (self.option.endCurrPage) {
        self.onEndAnimation($currPage, $nextPage);
      }
    });
  };

  transition.prototype.nextPage = function(animation) {
    if (this.option.isAnimating) {
      return false;
    }

    this.option.isAnimating = true;
    var $currPage = this.option.$pages.eq(this.option.current);
    if (this.option.current < this.option.pagesCount - 1) {
      ++this.option.current;
    } else if (
      this.option.current >= this.option.pagesCount - 1 &&
      this.option.loop
    ) {
      this.option.current = 0;
    } else {
      return false;
    }

    var self = this;
    var animateWork = self.chooseAnimation(animation);
    var $nextPage = this.option.$pages
        .eq(this.option.current)
        .addClass("pt-page-current"),
      outClass = animateWork.outClass,
      inClass = animateWork.inClass;
    $currPage.addClass(outClass).on("webkitAnimationEnd", function() {
      $currPage.off("webkitAnimationEnd");
      self.option.endCurrPage = true;
      if (self.option.endNextPage) {
        self.onEndAnimation($currPage, $nextPage);
      }
    });

    $nextPage.addClass(inClass).on("webkitAnimationEnd", function() {
      $nextPage.off("webkitAnimationEnd");
      self.option.endNextPage = true;
      if (self.option.endCurrPage) {
        self.onEndAnimation($currPage, $nextPage);
      }
    });
  };

  transition.prototype.onEndAnimation = function($outpage, $inpage) {
    this.option.endCurrPage = false;
    this.option.endNextPage = false;
    this.resetPage($outpage, $inpage);
    this.option.isAnimating = false;
  };

  transition.prototype.resetPage = function($outpage, $inpage) {
    $outpage.attr("class", $outpage.data("originalClassList"));
    $inpage.attr(
      "class",
      $inpage.data("originalClassList") + " pt-page-current"
    );
    this.option.callback && this.option.callback(this.option.current);
  };

  transition.prototype.appendAfter = function(html) {
    var pagesCount = this.option.pagesCount,
      diff = 0;
    this.option.$main.append(html);
    this.option.$pages = this.option.$main.children(".pt-page");
    this.option.pagesCount = this.option.$pages.length;
    diff = this.option.pagesCount - pagesCount;
    for (var i = 1; i <= diff; i++) {
      this.option.$pages
        .eq(this.option.pagesCount - i)
        .data(
          "originalClassList",
          this.option.$pages.eq(this.option.pagesCount - i).attr("class")
        );
    }
  };

  transition.prototype.prependAfter = function(html) {
    var pagesCount = this.option.pagesCount,
      diff = 0;
    this.option.$main.prepend(html);
    this.option.$pages = this.option.$main.children(".pt-page");
    this.option.pagesCount = this.option.$pages.length;
    diff = this.option.pagesCount - pagesCount;
    for (var i = 0; i < diff; i++) {
      this.option.$pages
        .eq(i)
        .data("originalClassList", this.option.$pages.eq(i).attr("class"));
    }
  };

  transition.prototype.destroy = function() {};

  function transition(option) {
    this.init(option);
  }

  exports.transition = transition;
});
