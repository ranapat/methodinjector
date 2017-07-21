import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { Injector } from '../../src';

describe('Test Injector', () => {
  chai.use(chai_spies);

  it('to have inject before and inject after', () => {
    expect(Injector.INJECT_BEFORE).to.equal(0);
    expect(Injector.INJECT_AFTER).to.equal(1);
  });

  it('to have launchers empty as default', () => {
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to convert function to a launcher', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const launcher = Injector._toLauncher(method);
    expect(Injector._launchers.length).to.equal(1);
    expect(launcher).to.not.equal(undefined);
    expect(launcher.original).to.equal(method);
    Injector.reset(launcher.launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to reset', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const launcher = Injector._toLauncher(method);
    expect(Injector._launchers.length).to.equal(1);
    Injector.reset(launcher.launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to locate', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const launcher1 = Injector._locate(method);
    expect(launcher1).to.equal(undefined);
    expect(Injector._launchers.length).to.equal(0);
    const launcher2 = Injector._toLauncher(method);
    expect(Injector._launchers.length).to.equal(1);
    const launcher3 = Injector._locate(launcher2.launch);
    expect(launcher3).to.equal(launcher2);
    Injector.reset(launcher3.launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject before', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.injectBefore(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject before by default', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject before with parameters', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject, Injector.INJECT_BEFORE);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject after with parameters', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject, Injector.INJECT_AFTER);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].after.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to inject after', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.injectAfter(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].after.length).to.equal(1);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to have launch as inject result', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].launch).to.equal(launch);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });

  it('to have remove', () => {
    expect(Injector._launchers.length).to.equal(0);
    const method = () => {};
    const inject = () => {};
    const launch = Injector.inject(method, inject);
    expect(Injector._launchers.length).to.equal(1);
    expect(Injector._launchers[0].launch).to.equal(launch);
    expect(Injector._launchers[0].before.length).to.equal(1);
    Injector.remove(launch, inject);
    expect(Injector._launchers[0].before.length).to.equal(0);
    Injector.reset(launch);
    expect(Injector._launchers.length).to.equal(0);
  });


});
