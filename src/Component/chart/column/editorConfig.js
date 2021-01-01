export default [
  {
    name: "折线图",
    position: "3.5.1",
    defaultSchema: {
      "type": "lineChartCmp",
      "layoutConfig": {
        "width": 500,
        "height": 500
      },
      "props": {
        "legend": {
          "show": true,
          "data": ['A','B']
        },
        "grid": {
          "width": 200,
          "height":200
        },
        "xAxis": {
          "type": 'category',
          "data": ['邮件营销', '搜索引擎']
        },
        "yAxis": {
          "type": 'value',
        },
        "series": [
          {
            "name": 'A',
            "type": 'line',
            "data": [934, 1290, 1330, 1600]
          },
          {
            "name": 'B',
            "type": 'line',
            "data": [120, 90, 230, 210, 0]
          }
        ],
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
