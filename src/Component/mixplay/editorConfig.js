export default [
  {
    name: "混播",
    position: "3.0.0",
    before: {
      types: ["image","video","document"],
      multi: true,
      title: "混播",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        schema.props.components = a;
        return schema;
      },
    },
    defaultSchema: {
      "type": "mixplayCmp",
      "layoutConfig": {
        "width": 200,
        "height": 200
      },
      "props": {
        "components":[],
        "changeTime":3
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
