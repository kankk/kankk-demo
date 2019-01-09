export default {
  functional: true,
  props: {
    row: Object,  // 当前行的数据
    column: Object, // 当前列的数据
    index: Number,  // 当前是第几行
    render: Function,  // 具体的render函数的内容
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    };

    return ctx.props.render(h, params);
  }
};