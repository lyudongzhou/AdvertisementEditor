export default [
  {
    name: "日期",
    position: "3.1.1",
    defaultSchema: {
      "type": "lineChartCmp",
      "layoutConfig": {
        "width": 500,
        "height": 500
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
