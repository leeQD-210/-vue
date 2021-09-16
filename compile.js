class Complier {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.complie(this.el);
  }
  complie(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      /* 如果是文本节点 */
      if (this.isTextNode(node)) {
        /* 编译文本节点内容 */
        this.compileTextNode(node);
      } else if (this.isElementNode(node)) {
        /* 编译元素节点内容 */
        this.complieElementNode(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.complie(node);
      }
    });
  }
  /* 判断是否是文本节点 */
  isTextNode(node) {
    return node.nodeType === 3;
  }
  /* 判断是否是元素节点 */
  isElementNode(node) {
    return node.nodeType === 1;
  }
  /* 判断属性名是否为指令 */
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  compileTextNode(node) {
    let reg = /\{\{(.*)\}\}/;
    let nodeContent = node.nodeValue;
    if (reg.test(nodeContent)) {
      let key = RegExp.$1.trim();
      node.nodeValue = nodeContent.replace(reg, this.vm[key]);
      new Watcher(this.vm, key, (newValue) => {
        node.nodeValue = nodeContent.replace(reg, newValue);
      });
    }
  }
  complieElementNode(node) {
    Array.from(node.attributes).forEach((attr) => {
      let attrName = attr.name;
      /* 判断是否是v-指令 */
      if (this.isDirective(attrName)) {
        this.update && this.update(node, attr, attrName);
      }
    });
  }
  update(node, attr, attrName) {
    let methodName = attrName.substr(2) + 'Update';
    this[methodName](node, attr);
  }
  textUpdate(node, attr) {
    let key = attr.nodeValue;
		node.textContent = this.vm[key];
		new Watcher(this.vm, key, (newValue) => {
			console.log(newValue)
      node.textContent = newValue;
    });
  }
  modelUpdate(node, attr) {
    let key = attr.nodeValue;
    node.value = this.vm[key];
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });
    node.addEventListener('input', () => {
      this.vm[key] = node.value-0;
    });
  }
}
