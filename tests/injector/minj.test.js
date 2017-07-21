import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { Injector, minj } from '../../src';

describe('Test minj', () => {
  chai.use(chai_spies);

  it('to inject', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minj(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject before by default', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minj(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject before with parameters', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minj(method, inject, Injector.INJECT_BEFORE);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject after with parameters', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minj(method, inject, Injector.INJECT_AFTER);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].after.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to have launch as inject result', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = minj(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].launch).to.equal(launch);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });
});
