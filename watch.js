class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.cb = callback;
    /* this为watcher实例 */
    Dep.target = this;
    this.oldValue = vm[key];
  }
  update() {
    let newValue = this.vm[this.key];
    if (newValue === this.oldValue) {
      return;
    }
    this.cb(newValue);
  }
}
