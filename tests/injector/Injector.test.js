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
    const method = () => {};
    const launcher = Injector._toLauncher(method);
    expect(1).to.equal(2);
  });

});
