export default [
  {
    name: "星期",
    position: "3.1.3",
    defaultSchema: {
      "type": "weekdayCmp",
      "layoutConfig": {
        "width": 300,
        "height": 300
      },
      "props": {
        "legend": {
          "show": true,
        },
        "grid": {
          "width": 'auto',
          "height": 'auto'
        },
        "series": [
          {
            "name": "访问来源",
            "type": "pie",
            "radius": "55%",
            "data": [
              {"value": "40", "name": "直接访问"},
              {"value": "60", "name": "搜索引擎"}
            ],
            "label": {
              "formatter": "{c}"
            }
          }
        ]
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
