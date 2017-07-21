class Launcher {
  constructor(original) {
    this.original = original;
    this.before = [];
    this.after = [];

    this.launch = this.launch.bind(this);
  }

  launch(...args) {
    this.before.forEach((callback) => {
      const result = callback(...args);
      args = result !== undefined ? result : args;
    });
    if (this.original !== undefined) {
      this.original(...args);
    }
    this.after.forEach((callback) => {
      const result = callback(...args);
      args = result !== undefined ? result : args;
    });
  }
}

export default Launcher;
