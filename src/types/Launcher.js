/**
 * Launcher
 *
 * Launcher class. Keeps original method and injections.
 *
 * @param {Function} original original function
 */
class Launcher {
  /**
   * Task constructor
   *
   * @param {Function} original original function
   */
  constructor(original) {
    this.original = original;
    this.before = [];
    this.after = [];

    this.launch = this.launch.bind(this);
  }

  /**
   * Launches
   *
   * Runs the original function and all the injections.
   * Tries to combine arguments and keeps the changes
   *
   * @param {any} any any arguments
   * @return {any} any any result from original function
   */
  launch(...args) {
    let result = undefined;
    this.before.forEach((callback) => {
      const result = callback(...args);
      args = result !== undefined ? result : args;
    });
    if (this.original !== undefined) {
      result = this.original(...args);
    }
    this.after.forEach((callback) => {
      const result = callback(...args);
      args = result !== undefined ? result : args;
    });
    return result;
  }
}

export default Launcher;
