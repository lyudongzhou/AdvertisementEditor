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
    "singlePagePlayTime": 2000
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
            "text": "111",
            "fontSize": 15,
            "fontFamily": "微软雅黑",
            "fontWeight": 15,
            "fontStyle": "normal",
            "color": "#0F0F0F"
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
              "type": "log",
              "value": "Dialog1"
            }
          ],
          "children": []
        },
        {
          "id": 2,
          "name": "图片1",
          "type": "ImageCmp",
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
          "events": [
            {
              "type": "nextPage",
              "value": ""
            }
          ],
          "children": []
        }
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
          "value": "#EFEFEF"
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
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "open the dialog 2",
            "fontSize": 15,
            "fontFamily": "微软雅黑",
            "fontWeight": 15,
            "fontStyle": "normal",
            "color": "#0F0F0F"
          },
          "animation": [
            {
              "name": "fadeout"
            }
          ],
          "events": [
            {
              "type": "openTheWindow",
              "value": {
                "openId": "弹窗2",
                "backTime": 2000
              }
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
            "width": 100,
            "height": 100,
            "opacity": 1
          },
          "props": {
            "text": "dialog 1 -> no event",
            "fontSize": 15,
            "fontFamily": "微软雅黑",
            "fontWeight": 15,
            "fontStyle": "normal",
            "color": "#0F0F0F"
          },
          "animation": [
            {
              "name": "fadeout"
            }
          ],
          "events": [],
          "children": []
        }
      ]
    }
  ]
}
