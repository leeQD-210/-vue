class Dep {
  constructor() {
    this.subs = [];
  }
  addSubs(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
