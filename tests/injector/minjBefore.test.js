import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { Injector, minjBefore } from '../../src';

describe('Test minjBefore', () => {
  chai.use(chai_spies);

  it('to inject before', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minjBefore(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });
});
