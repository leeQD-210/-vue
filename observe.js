class Observe {
  constructor(data) {
    this.listen(data);
  }
  listen(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
	defineReactive (data, key, value) {
		 /* 对子元素也进行响应式绑定 */
		this.listen(value);
		let that = this
		let dep=new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
			get () {
				Dep.target&&dep.addSubs(Dep.target)
				return value;
				// Dep.target表示watcher实例
      },
      set(newValue) {
        if (newValue === value) {
          return;
				}
				value = newValue;
				/* 对更新后的直 */
				that.listen(value)
				/* 触发更新函数 */
				dep.notify()
      },
    });
  }
}
