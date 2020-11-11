const pickAttrs = (attrs = {}) => {
  const {type, layoutConfig, props, events} = attrs;
  const {children, ...rest} = translateProps(props);
  const eventsConfig = translateEvents(events);
  const style = translateStyle(layoutConfig);
  return {
    liProps: {
      style: {
        ...style,
        position: 'relative'
      },
    },
    componentProps: {...rest, ...eventsConfig},
    Component: type,
    children: children,
  }
};


const eventConfig = {
  alert: {
    eventKey: 'onClick',
    method: (arg) => alert(arg.value),
  },
};
// todo 属性转换
const translateProps = props => props;
export const translateStyle = style => {
  const {top, left, height, width} = style;
  const unit = 'px';
  return {
    top: top + unit,
    left: left + unit,
    height: height + unit,
    width: width + unit,
  }
};

const translateEvents = events => {
  if (!events || !events.length) {
    return {};
  }
  const eventMap = {};

  events.forEach(({type, ...rest}) => {
    if (eventConfig[type]) {
      const {eventKey, method} = eventConfig[type];
      if (eventMap[eventKey]) {
        eventMap.push([method, rest]);
      } else {
        eventMap[eventKey] = [[method, rest]]
      }
    }
  });
  // todo 需要polyfill，ie9肯定是没有的
  return Object.entries(eventMap).reduce((p, [key, funs]) => {
    p[key] = () => funs.forEach(([method, args]) => {
      // todo 看看有没有this问题
      method(args);
    });
    return p;
  }, {});
};


export default {
  props: {
    component: Object,
  },
  methods: {
    handleClick($event) {
      this.$emit('click', $event, this.component.id)
    }
  },
  render() {
    const {liProps, componentProps, Component, children} = pickAttrs(translateProps(this.component));
    // fixme 扩展符导致事件失效问题
    return (
      <li {...liProps} onClick={this.handleClick}>
        <Component {...componentProps}>{children}</Component>
      </li>
    )
  }
}