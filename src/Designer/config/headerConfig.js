import iconText from '../public/icon_text.png'
import iconVedio from '../public/icon_vedio.png'
import iconModule from '../public/icon_module.png'
import iconOther from '../public/icon_other.png'
import iconPlugin from '../public/icon_plugin.png'
// import iconImg from '../public/icon_img.png'

export default [
  {
    "id": 1,
    "label": "文本",
    "type": "text",
    "icon": iconText,
    "children": []
  },
  {
    "id": 2,
    "label": "图片",
    "type": "ImageCmp",
    "icon": "",
    "children": []
  },
  {
    "id": 3,
    "label": "视频",
    "type": "vedio",
    "icon": iconVedio,
    "children": []
  },
  {
    "id": 4,
    "label": "组件",
    "type": "module",
    "icon": iconModule,
    "children": [
      {
        "id": 1,
        "label": "基础组件",
        "children": [
          {
            "id": 1,
            "label": "混播",
            "type": "mix_sowing",
            "icon": "/icon_mix_sowing.png"
          },
          {
            "id": 2,
            "label": "文档",
            "type": "document",
            "icon": "/icon_document.png"
          },
          {
            "id": 3,
            "label": "按钮",
            "type": "BtnCmp",
            "icon": "/icon_button.png"
          },
          {
            "id": 4,
            "label": "网页",
            "type": "webpage",
            "icon": "/icon_webpage.png"
          },
          {
            "id": 5,
            "label": "本地网页",
            "type": "local_webpage",
            "icon": "/icon_local_webpage.png"
          },
          {
            "id": 6,
            "label": "二维码",
            "type": "qrcode",
            "icon": "/icon_qrcode.png"
          },
          {
            "id": 7,
            "label": "相册",
            "type": "album",
            "icon": "/icon_album.png"
          }
        ]
      },
      {
        "id": 2,
        "label": "时间组件",
        "children": [
          {
            "id": 1,
            "label": "时间",
            "type": "time",
            "icon": "/icon_time.png"
          },
          {
            "id": 2,
            "label": "日期",
            "type": "document",
            "icon": "/icon_document.png"
          },
          {
            "id": 3,
            "label": "周",
            "type": "week",
            "icon": "/icon_week.png"
          },
          {
            "id": 4,
            "label": "星期",
            "type": "weekday",
            "icon": "/icon_weekday.png"
          }
        ]
      },
      {
        "id": 3,
        "label": "计时组件",
        "children": [
          {
            "id": 1,
            "label": "倒计时",
            "type": "countdown",
            "icon": "/icon_countdown.png"
          },
          {
            "id": 2,
            "label": "正计时",
            "type": "timing",
            "icon": "/icon_timing.png"
          },
          {
            "id": 3,
            "label": "计时器",
            "type": "timer",
            "icon": "/icon_timer.png"
          }
        ]
      },
      {
        "id": 4,
        "label": "公告组件",
        "children": [
          {
            "id": 1,
            "label": "通知",
            "type": "inform",
            "icon": "/icon_inform.png"
          },
          {
            "id": 2,
            "label": "字幕",
            "type": "caption",
            "icon": "/icon_caption.png"
          }
        ]
      },
      {
        "id": 5,
        "label": "天气组件",
        "children": [
          {
            "id": 1,
            "label": "实时预报",
            "type": "real_time_forecast",
            "icon": "/icon_real_time_forecast.png"
          },
          {
            "id": 2,
            "label": "24小时预报",
            "type": "oneday_forecast",
            "icon": "/icon_oneday_forecast.png"
          },
          {
            "id": 3,
            "label": "7天预报",
            "type": "weekday_forecast",
            "icon": "/icon_weekday_forecast.png"
          },
          {
            "id": 4,
            "label": "生活指数",
            "type": "index_live",
            "icon": "/icon_index_live.png"
          },
          {
            "id": 5,
            "label": "空气质量指数",
            "type": "index_air",
            "icon": "/icon_index_air.png"
          }
        ]
      },
      {
        "id": 6,
        "label": "图表组件",
        "children": [
          {
            "id": 1,
            "label": "饼图",
            "type": "pie",
            "icon": "/icon_pie.png"
          },
          {
            "id": 2,
            "label": "折线图",
            "type": "line_chart",
            "icon": "/icon_line_chart.png"
          },
          {
            "id": 3,
            "label": "柱形图",
            "type": "column_chart",
            "icon": "/icon_column_chart.png"
          },
          {
            "id": 4,
            "label": "条形图",
            "type": "bar_chart",
            "icon": "/icon_bar_chart.png"
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "label": "插件",
    "type": "plugin",
    "icon": iconPlugin,
    "children": [
      {
        "id": 1,
        "label": "常用插件",
        "children": [
          {
            "id": 1,
            "label": "投票",
            "type": "vote",
            "icon": "/icon_vote.png"
          },
          {
            "id": 2,
            "label": "表单",
            "type": "form",
            "icon": "/icon_form.png"
          },
          {
            "id": 3,
            "label": "抽奖",
            "type": "lucky_draw",
            "icon": "/icon_lucky_draw.png"
          },
          {
            "id": 4,
            "label": "电子货架",
            "type": "e_shelf",
            "icon": "/icon_e_shelf.png"
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "label": "其他",
    "type": "other",
    "icon": iconOther,
    "children": [
      {
        "id": 1,
        "label": "形状",
        "children": [
          {
            "id": 1,
            "label": "",
            "type": "circle",
            "icon": "/icon_circle.png"
          },
          {
            "id": 2,
            "label": "",
            "type": "heart",
            "icon": "/icon_heart.png"
          },
          {
            "id": 3,
            "label": "",
            "type": "snow",
            "icon": "/icon_snow.png"
          },
          {
            "id": 4,
            "label": "",
            "type": "blood",
            "icon": "/icon_blood.png"
          }
        ]
      },
      {
        "id": 2,
        "label": "线和箭头",
        "children": [
          {
            "id": 1,
            "label": "",
            "type": "circle",
            "icon": "/icon_circle.png"
          },
          {
            "id": 2,
            "label": "",
            "type": "heart",
            "icon": "/icon_heart.png"
          },
          {
            "id": 3,
            "label": "",
            "type": "snow",
            "icon": "/icon_snow.png"
          },
          {
            "id": 4,
            "label": "",
            "type": "blood",
            "icon": "/icon_blood.png"
          }
        ]
      },
      {
        "id": 3,
        "label": "装饰",
        "children": [
          {
            "id": 1,
            "label": "",
            "type": "circle",
            "icon": "/icon_circle.png"
          },
          {
            "id": 2,
            "label": "",
            "type": "heart",
            "icon": "/icon_heart.png"
          },
          {
            "id": 3,
            "label": "",
            "type": "snow",
            "icon": "/icon_snow.png"
          },
          {
            "id": 4,
            "label": "",
            "type": "blood",
            "icon": "/icon_blood.png"
          }
        ]
      },
      {
        "id": 4,
        "label": "图片容器",
        "children": [
          {
            "id": 1,
            "label": "",
            "type": "circle",
            "icon": "/icon_circle.png"
          },
          {
            "id": 2,
            "label": "",
            "type": "heart",
            "icon": "/icon_heart.png"
          },
          {
            "id": 3,
            "label": "",
            "type": "snow",
            "icon": "/icon_snow.png"
          },
          {
            "id": 4,
            "label": "",
            "type": "blood",
            "icon": "/icon_blood.png"
          }
        ]
      }
    ]
  }
]
