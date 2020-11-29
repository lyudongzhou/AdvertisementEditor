window.renderData = {
  "version": "1.0",
  "description": "",
  "container": {
    "width": 1000,
    "height": 700,
    "bgm": {
      "autoPlay": true,
      "src": "audios/audio.mp3"
    }
  },
  "change": {
    "type": 3,
    "loop": true,
    "singlePagePlayTime": 3000
  },
  "pages": [
    {
      "name": "页面1",
      "id": "1",
      "container": {
        "backGround": {
          "type": "color",
          "value": "lightcyan"
        }
      },
      "components": [
        {
          "id": 1,
          "name": "按钮1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 100,
            "left": 100,
            "rotation": 31.41592653589793,
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "open the dialog 1"
          },
          "animation": [
            {
              "type": "fadeout",
              "duration": 100,
              "delay": 0,
              "times": 1
            }
          ],
          "events": [
            {
              "type": "openTheWindow",
              "value": {'openId':'弹窗1','backTime':2000}
            }
          ],
          "children": []
        },
        {
          "id": 2,
          "name": "图片1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 200,
            "left": 200,
            "rotation": 3.141592653589793,
            "width": 200,
            "height": 200,
            "opacity": 1
          },
          "props": {
            "text": "open the page 3"
          },
          "animation": [
            {
              "type": "shaking",
              "duration": 100,
              "delay": 0,
              "times": 2
            }
          ],
          "events": [
            {
              "type": "openTheWindow",
              "value": {'openId':'3','backTime':2000}
            }
          ],
          "children": []
        },
        {
          "id": 3,
          "name": "按钮3",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 200,
            "left": 400,
            "rotation": 31.41592653589793,
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "page 1 -> no event"
          },
          "animation": [
            {
              "type": "fadeout",
              "duration": 100,
              "delay": 0,
              "times": 1
            }
          ],
          "events": [],
          "children": []
        },
      ]
    },
    {
      "name": "页面2",
      "id": "2",
      "container": {
        "backGround": {
          "type": "color",
          "value": "lightgreen"
        }
      },
      "components": [
        {
          "id": 1,
          "name": "按钮1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 100,
            "left": 100,
            "rotation": 31.41592653589793,
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "page 2 not events"
          },
          "animation": [
            {
              "type": "shaking",
              "duration": 100,
              "delay": 0,
              "times": 1
            }
          ],
          "events": [],
          "children": []
        },
        {
          "id": 2,
          "name": "图片1",
          "type": "ImageCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 300,
            "left": 300,
            "rotation": 3.141592653589793,
            "width": 200,
            "height": 200,
            "opacity": 1
          },
          "props": {
            "bgUrl": "images/Koala.jpg"
          },
          "animation": [
            {
              "type": "shaking",
              "duration": 100,
              "delay": 0,
              "times": 2
            }
          ],
          "events": [],
          "children": []
        },
      ]
    },
    {
      "name": "页面3",
      "id": "3",
      "container": {
        "backGround": {
          "type": "color",
          "value": "#ABCDEF"
        }
      },
      "components": [
        {
          "id": 1,
          "name": "按钮1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 100,
            "left": 100,
            "rotation": 31.41592653589793,
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "open the dialog3"
          },
          "animation": [
            {
              "type": "shaking",
              "duration": 100,
              "delay": 0,
              "times": 1
            }
          ],
          "events": [
            {
              "type": "openTheWindow",
              "value": {"openId": "弹窗3", "backTime": 2000}
            }
          ],
          "children": []
        },
        {
          "id": 2,
          "name": "按钮2",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 300,
            "left": 300,
            "rotation": 31.41592653589793,
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "page 3 -> no event"
          },
          "animation": [
            {
              "type": "fadeout",
              "duration": 100,
              "delay": 0,
              "times": 1
            }
          ],
          "events": [],
          "children": []
        },
      ]
    }
  ],
  "dialogs": [
    {
      "name": "弹窗1",
      "id": "弹窗1",
      "container": {
        "backGround": {
          "type": "color",
          "value": "#ABCDEF"
        }
      },
      "components": [
        {
          "id": 1,
          "name": "按钮1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 100,
            "left": 100,
            "rotation": 3.141592653589793,
            "width": 1,
            "height": 1,
            "opacity": 1
          },
          "props": {
            "text": "open the dialog 2"
          },
          "animation": [{
            "name": "fadeout"
          }],
          "events": [
            {
              "type": "openTheWindow",
              "value": {"openId": "弹窗2", "backTime": 2000}
            }
          ],
          "children": []
        },
        {
          "id": 2,
          "name": "按钮2",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 300,
            "left": 300,
            "rotation": 3.141592653589793,
            "width": 1,
            "height": 1,
            "opacity": 1
          },
          "props": {
            "text": "dialog 1 -> no event"
          },
          "animation": [{
            "name": "fadeout"
          }],
          "events": [],
          "children": []
        }
      ]
    },
    {
      "name": "弹窗2",
      "id": "弹窗2",
      "container": {
        "backGround": {
          "type": "color",
          "value": "orange"
        }
      },
      "components": [
        {
          "id": 1,
          "name": "图片1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 200,
            "left": 200,
            "rotation": 3.141592653589793,
            "width": 200,
            "height": 200,
            "opacity": 1
          },
          "props": {
            "text": "open the dialog 3"
          },
          "animation": [
            {
              "name": "fadetop",
              "duration": 100,
              "delay": 0,
              "times": 2
            }
          ],
          "events": [
            {
              "type": "openTheWindow",
              "value": {"openId": "弹窗3", "backTime": 2000}
            }
          ],
          "children": []
        }
      ]
    },
    {
      "name": "弹窗3",
      "id": "弹窗3",
      "container": {
        "backGround": {
          "type": "color",
          "value": "yellow"
        }
      },
      "components": [
        {
          "id": 1,
          "name": "图片1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 100,
            "left": 100,
            "rotation": 3.141592653589793,
            "width": 200,
            "height": 200,
            "opacity": 1
          },
          "props": {
            "text": "open the page 2"
          },
          "animation": [
            {
              "name": "fadeout",
              "duration": 100,
              "delay": 0,
              "times": 2
            }
          ],
          "events": [
            {
              "type": "openTheWindow",
              "value": {"openId": "2", "backTime": 2000}
            }
          ],
          "children": []
        },
        {
          "id": 1,
          "name": "图片1",
          "type": "textCmp",
          "layoutConfig": {
            "zIndex": 1,
            "top": 300,
            "left": 300,
            "rotation": 3.141592653589793,
            "width": 200,
            "height": 200,
            "opacity": 1
          },
          "props": {
            "text": "dialog 3 -> no event"
          },
          "animation": [
            {
              "name": "fadeout",
              "duration": 100,
              "delay": 0,
              "times": 2
            }
          ],
          "events": [],
          "children": []
        }
      ]
    },
  ]
}
