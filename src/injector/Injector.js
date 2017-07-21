import Launcher from '../types/Launcher';

/**
 * Injector
 *
 * Contains inject and cleanup methods
 *
 * @static
 */
class Injector {
  /**
   * Predefined inject before
   *
   * @param {int} INJECT_BEFORE predefined value
   * @static
   */
  static INJECT_BEFORE = 0;

  /**
   * Predefined inject after
   *
   * @param {int} INJECT_AFTER predefined value
   * @static
   */
  static INJECT_AFTER = 1;

  /**
   * All launchers
   *
   * @param {Array<Launcher>} _launchers all launchers
   * @static
   * @private
   */
  static _launchers = [];

  /**
   * Inject before
   *
   * @param {Function} method original method or launch method
   * @param {Function} inject inject method
   * @return {Function} launch launch method
   * @static
   */
  static injectBefore(method, inject) {
    return Injector.inject(method, inject, Injector.INJECT_BEFORE);
  }

  /**
   * Inject after
   *
   * @param {Function} method original method or launch method
   * @param {Function} inject inject method
   * @return {Function} launch launch method
   * @static
   */
  static injectAfter(method, inject) {
    return Injector.inject(method, inject, Injector.INJECT_AFTER);
  }

  /**
   * Inject before or after
   *
   * @param {Function} method original method or launch method
   * @param {Function} inject inject method
   * @param {int} beforeOrAfter 0 - before, 1 - is after
   * @return {Function} launch launch method
   * @static
   */
  static inject(method, inject, beforeOrAfter = 0) {
    const launcher = Injector._toLauncher(method);
    const collection = beforeOrAfter === Injector.INJECT_BEFORE ?
      launcher.before :
        beforeOrAfter === Injector.INJECT_AFTER ?
          launcher.after : []
    ;
    collection.push(inject);
    return launcher.launch;
  }

  /**
   * Remove injection
   *
   * @param {Function} launch method
   * @param {Function} inject inject method
   * @return {Function} launch launch method
   * @static
   */
  static remove(method, remove) {
    const launcher = Injector._toLauncher(method);
    if (launcher.before.indexOf(remove) !== -1) {
      launcher.before.splice(launcher.before.indexOf(remove), 1);
    } else if (launcher.after.indexOf(remove) !== -1) {
      launcher.after.splice(launcher.after.indexOf(remove), 1);
    }
    return method;
  }

  /**
   * Resets launch and all injections
   *
   * @param {Function} launch launch method
   * @return {Function} original original method
   * @static
   */
  static reset(method) {
    const launcher = Injector._locate(method);
    if (launcher !== undefined) {
      Injector._launchers.splice(Injector._launchers.indexOf(launcher), 1);
      return launcher.original;
    } else {
      return method;
    }
  }

  /**
   * Converts original to launch
   *
   * @param {Function} method original method or launch method
   * @return {Launcher} launcher launcher
   * @static
   * @protected
   */
  static _toLauncher(method) {
    const located = Injector._locate(method);
    if (located === undefined) {
      const launcher = new Launcher(method);
      Injector._launchers.push(launcher);
      return launcher;
    } else {
      return located;
    }
  }

  /**
   * Locates launcher by launch method
   *
   * @param {Function} method launch method
   * @return {Launcher} launcher launcher
   * @static
   * @protected
   */
  static _locate(method) {
    const launchers = Injector._launchers;
    const length = launchers.length;
    let located = undefined;
    for (let i = 0; i < length; ++i) {
      if (launchers[i].launch === method) {
        located = launchers[i];
        break;
      }
    }
    return located;
  }

}

export default Injector;
