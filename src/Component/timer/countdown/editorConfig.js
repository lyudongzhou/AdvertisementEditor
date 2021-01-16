import {ONE_DAY_TIMESTAMP} from '@/utils';

export default [
  {
    name: "倒计时",
    position: "3.2.0",
    defaultSchema: {
      "type": "countdownCmp",
      "layoutConfig": {
        "width": 300,
        "height": 50
      },
      "props": {
        "background": "transparent",
        "color": "#000",
        "fontSize": '30',
        endTime: new Date().getTime() + 3 * ONE_DAY_TIMESTAMP,
        format: 'ddHHmmss',
        text: '开始啦！',
        fontAlign: 'center'
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
