import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { Injector, mrem, mres } from '../../src';

describe('Test mres', () => {
  chai.use(chai_spies);

  it('to have reset', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].launch).to.equal(launch);
    expect(Injector._launchers[0].before.length).to.equal(1);
    mrem(launch, inject);
    expect(Injector._launchers[0].before.length).to.equal(0);
    mres(launch);
    expect(Injector._launchers.length).to.equal(0);
  });
});
