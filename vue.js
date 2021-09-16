class Vue {
  constructor(options) {
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el;
    this.$data = options.data;
    this.$options = options;
    this._proxyData(this.$data);
    new Observe(this.$data);
    new Complier(this);
  }
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}
