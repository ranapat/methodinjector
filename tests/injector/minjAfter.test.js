import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { Injector, minjAfter } from '../../src';

describe('Test minjAfter', () => {
  chai.use(chai_spies);

  it('to inject after', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minjAfter(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].after.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });
});
