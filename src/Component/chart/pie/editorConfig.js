export default [
  {
    name: "饼图",
    position: "3.5.0",
    defaultSchema: {
      "type": "pieChartCmp",
      "layoutConfig": {
        "width": 300,
        "height": 300
      },
      "props": {
        "legend": {
          "show": true,
        },
        "grid": {
          "width": 200,
          "height": 200
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
