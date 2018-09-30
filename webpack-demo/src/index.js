// import _ from 'lodash';

import './style.css';

import Logo from './logo.png';

// import printMe from './print';

const webpackNumber = require('./webpack-number');

function component() {

  // 添加div
  const element = document.createElement('div');
  element.classList.add('main');
  element.innerHTML = _.join(['Hello', 'Webpack', '!', '!!'], ' ');

  // 添加图片
  const logo = new Image();
  logo.classList.add('logo');
  logo.src = Logo;
  element.appendChild(logo);

  // 添加背景
  const logoBg = document.createElement('div');
  logoBg.classList.add('logo-bg');
  element.appendChild(logoBg);

  // 添加按钮
  const button = document.createElement('button');
  button.innerHTML = 'Click Me';
  // button.onclick = printMe;
  // 懒加载
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const printMe = module.default;

    printMe();
  })
  element.appendChild(button);

  return element;
}


// document.body.appendChild(component());

// if (module.hot) {
//   module.hot.accept('./print.js', () => {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    return component()
  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
  console.log(webpackNumber('five'));
  document.body.appendChild(component);
})