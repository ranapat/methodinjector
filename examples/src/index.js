import { Injector } from '../../lib';
import { inject, injectBefore, injectAfter } from '../../lib';
import { reset } from '../../lib';


console.log();
console.log('--- methodinjector examples');

function test() {
  console.log('test');
}

test = Injector.inject(test, () => { console.log('added before 1') }, 0);
test = Injector.inject(test, () => { console.log('added before 2') }, 0);
test = Injector.inject(test, () => { console.log('added after 1') }, 1);
test = Injector.inject(test, () => { console.log('added after 2') }, 1);
//test = Injector.reset(test);

console.log(test);
console.log(Injector._launchers);

test();


console.log('-------------------');

class TestClass {
  constructor() {
    this.property = '123';
  }

  test(...args) {
    console.log('this is a test method', this, args);
  }
}

const i = new TestClass();
let test1 = i.test.bind(i);

test1 = inject(test1, (...args) => { console.log('we change it here!!! 1'); });
test1 = injectBefore(test1, (...args) => { console.log('we change it here!!! 2'); });
test1 = injectAfter(test1, (...args) => { console.log('we change it here!!! 3'); });
test1 = reset(test1);

test1(1, 2, 3);
