import iconText from '../public/icon_text.png';
import iconImg from '../public/icon_img.png';
import iconVedio from '../public/icon_vedio.png';
import iconModule from '../public/icon_module.png';
import iconOther from '../public/icon_other.png';
import iconPlugin from '../public/icon_plugin.png';
import barChart from '../public/bar_chart.png';
import clock from '../public/clock.png';
import countDown from '../public/count_down.png';
import date from '../public/date.png';
import inform from '../public/inform.png';
import isTiming from '../public/is_timing.png';
import lineChart from '../public/line_chart.png';
import lineCode from '../public/line_code.png';
import link from '../public/link.png';
import mix from '../public/mix.png';
import pieChart from '../public/pie_chart.png';
import qrcode from '../public/qrcode.png';
import subTitle from '../public/sub_title.png';
import weather from '../public/weather.png';
import week from '../public/week.png';
import plugin from '../public/plugin.png';
// import iconImg from '../public/icon_img.png'
import { get } from "@/register";
import { REG_TITLECONFIG } from "@/const";
import "../../Component";
let Constructor ={children:[
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
    "icon": iconImg,
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
            "icon": mix
          },
          {
            "id": 2,
            "label": "文档",
            "type": "document",
            "icon": mix
          },
          {
            "id": 3,
            "label": "按钮",
            "type": "buttonCmp",
            "icon": mix
          },
          {
            "id": 4,
            "label": "网页",
            "type": "webpage",
            "icon": link
          },
          {
            "id": 5,
            "label": "二维码",
            "type": "qrcode",
            "icon": qrcode
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
            "icon": clock
          },
          {
            "id": 2,
            "label": "日期",
            "type": "date",
            "icon": date
          },
          {
            "id": 3,
            "label": "周",
            "type": "week",
            "icon": week
          },
          {
            "id": 4,
            "label": "星期",
            "type": "weekday",
            "icon": date
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
            "icon": countDown
          },
          {
            "id": 2,
            "label": "正计时",
            "type": "count",
            "icon": isTiming
          },
          {
            "id": 3,
            "label": "计时器",
            "type": "timer",
            "icon": isTiming
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
            "icon": inform
          },
          {
            "id": 2,
            "label": "字幕",
            "type": "caption",
            "icon": subTitle
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
            "icon": weather
          },
          {
            "id": 2,
            "label": "24小时预报",
            "type": "oneday_forecast",
            "icon": weather
          },
          {
            "id": 3,
            "label": "7天预报",
            "type": "weekday_forecast",
            "icon": weather
          },
          // {
          //   "id": 4,
          //   "label": "生活指南",
          //   "type": "index_live",
          //   "icon": weather
          // },
          // {
          //   "id": 5,
          //   "label": "空气质量指数",
          //   "type": "index_air",
          //   "icon": weather
          // }
        ]
      },
      {
        "id": 6,
        "label": "图表组件",
        "children": [
          {
            "id": 1,
            "label": "饼图",
            "type": "pieChartCmp",
            "icon": pieChart
          },
          {
            "id": 2,
            "label": "折线图",
            "type": "lineChartCmp",
            "icon": lineChart
          },
          {
            "id": 3,
            "label": "柱形图",
            "type": "columnChartCmp",
            "icon": barChart
          },
          {
            "id": 4,
            "label": "条形图",
            "type": "barChartCmp",
            "icon": lineCode
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
            "icon": plugin
          },
          {
            "id": 2,
            "label": "表单",
            "type": "form",
            "icon": plugin
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
            "type": "0.0",
            "color": '#666'
          },
          {
            "id": 2,
            "label": "",
            "type": "0.1",
            "color": '#ff71a1'
          },
          {
            "id": 3,
            "label": "",
            "type": "0.2",
            "color": '#666'
          },
          {
            "id": 4,
            "label": "",
            "type": "0.3",
            "color": '#ffac13'
          },
          {
            "id": 5,
            "label": "",
            "type": "0.4",
            "color": '#666'
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
            "type": "1.0",
            "color": "#ffd15c"
          },
          {
            "id": 2,
            "label": "",
            "type": "1.1",
            "color": "#666"
          },
          {
            "id": 3,
            "label": "",
            "type": "1.2",
            "color": "#666"
          },
          {
            "id": 4,
            "label": "",
            "type": "1.3",
            "color": "#666"
          },
          {
            "id": 5,
            "label": "",
            "type": "1.4",
            "color": "#666"
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
            "type": "2.0",
            "color": "#595757"
          },
          {
            "id": 2,
            "label": "",
            "type": "2.1",
            "color": "#ddaf59"
          },
          {
            "id": 3,
            "label": "",
            "type": "2.2",
            "color": "#666"
          },
          {
            "id": 4,
            "label": "",
            "type": "2.3",
            "color": "#ffca46"
          },
          {
            "id": 5,
            "label": "",
            "type": "2.4",
            "color": "#666"
          }
        ]
      },
      {
        "id": 4,
        "label": "图片容器",
        "children": [
          {
            "id": 1,
            "type": "3.0",
            "label": "",
          },
          {
            "id": 2,
            "label": "",
            "type": "3.1",
            "colo": "#5855c8"
          },
          {
            "id": 3,
            "label": "",
            "type": "3.2",
            "colo": "#b12621"
          },
          {
            "id": 4,
            "label": "",
            "type": "3.3",
            "colo": "#f9a326"
          },
          {
            "id": 5,
            "label": "",
            "type": "3.4",
            "colo": "#f9a326"
          }
        ]
      }
    ]
  },
  // {
  //   "id": 7,
  //   "label": "背景音频",
  //   "type": "ImageCmp",
  //   "icon": iconImg,
  //   "children": []
  // },
]};
const config = get(REG_TITLECONFIG);
console.log(config);
Object.keys(config).forEach(ele => {
  let schemas = config[ele];
  schemas.forEach(ele => {
    let arr = ele.position.split(".");
    let o = Constructor;
    arr.forEach(index=>{
      o = o.children[index];
    });
    o.editConfig = ele;
    o.label = ele.name;
  });
});
export default Constructor.children;
