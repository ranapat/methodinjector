import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { Injector, mrem } from '../../src';

describe('Test mrem', () => {
  chai.use(chai_spies);

  it('to have remove', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].launch).to.equal(launch);
    expect(Injector._launchers[0].before.length).to.equal(1);
    mrem(launch, inject);
    expect(Injector._launchers[0].before.length).to.equal(0);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });
});
