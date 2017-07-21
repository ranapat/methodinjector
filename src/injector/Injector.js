import Launcher from '../types/Launcher';

class Injector {
  static INJECT_BEFORE = 0;
  static INJECT_AFTER = 1;

  static _launchers = [];

  static injectBefore(method, inject) {
    return Injector.inject(method, inject, Injector.INJECT_BEFORE);
  }

  static injectAfter(method, inject) {
    return Injector.inject(method, inject, Injector.INJECT_AFTER);
  }

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

  static remove(method, remove) {
    const launcher = Injector._toLauncher(method);
    if (launcher.before.indexOf(remove) !== -1) {
      launcher.before.splice(launcher.before.indexOf(remove), 1);
    } else if (launcher.after.indexOf(remove) !== -1) {
      launcher.after.splice(launcher.after.indexOf(remove), 1);
    }
    return method;
  }

  static reset(method) {
    const launcher = Injector._locate(method);
    if (launcher !== undefined) {
      Injector._launchers.splice(Injector._launchers.indexOf(launcher), 1);
      return launcher.original;
    } else {
      return method;
    }
  }

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
