import Alert from './alert.vue';
import Vue from 'vue';

Alert.newInstance = properties => {
  const props = properties || {};

  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props: props
      });
    }
  })

  console.log(Instance);

  const componet = Instance.$mount();
  document.body.appendChild(componet.$el);

  // 因为Instance下只Render了一个子组件, 所有可以用$children[0]访问到
  const alert = Instance.$children[0];

  return {
    add (noticeProps) {
      alert.add(noticeProps);
    },
    remove (name) {
      alert.remove(name);
    }
  }
};

export default Alert;