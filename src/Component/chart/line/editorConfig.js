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
        "grid": {
          "width": 200,
          "height":200
        },
        "legend": {
          "show": true
        },
        "xAxis": {
          "type": 'category',
          "data": ['Mon', 'Tue']
        },
        "yAxis": {
          "type": 'value'
        },
        "series": [
          {
            "name": "A",
            "data": [1200, 200],
            "type": 'line'
          },
          {
            "name": "B",
            "data": [1000, 400],
            "type": 'line'
          }
        ]
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
