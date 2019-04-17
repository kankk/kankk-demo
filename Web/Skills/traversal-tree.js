const body = document.body;

function traversal(node) {
  // 对node的处理
  if (node && node.nodeType === 1) {
    console.log(node);
  }

  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    item = childNodes[i];
    if (item.nodeType === 1) {
      traversal(item);
    }
  }
}

traversal(body)