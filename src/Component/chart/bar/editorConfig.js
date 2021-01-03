export default [
  {
    name: "柱状图",
    position: "3.5.2",
    defaultSchema: {
      "type": "barChartCmp",
      "layoutConfig": {
        "width": 400,
        "height": 400
      },
      "props": {
        "grid": {
          "width": 'auto',
          "height": 'auto'
        },
        "legend": {
          "show": true
        },
        "xAxis": {
          "type": 'category',
          "data": ['Mon', 'Tue', 'Wed']
        },
        "yAxis": {
          "type": 'value'
        },
        "series": [
          {
            "name": "A",
            "data": [120, 200, 150],
            "type": 'bar'
          },
          {
            "name": "B",
            "data": [70, 110, 130],
            "type": 'bar'
          }
        ]
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
