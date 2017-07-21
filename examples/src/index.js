import { Injector } from '../../lib';
import { minj, minjBefore, minjAfter } from '../../lib';
import { mres, mrem } from '../../lib';


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

const i1 = () => { console.log('!!!!injected!!!!'); };
test1 = minj(test1, i1, 1);
test1 = minj(test1, (...args) => { console.log('we change it here!!! 1'); });
test1 = minjBefore(test1, (...args) => { console.log('we change it here!!! 2'); });
test1 = minjAfter(test1, (...args) => { console.log('we change it here!!! 3'); });
test1 = mrem(test1, i1);
//test1 = mres(test1);

test1(1, 2, 3);
