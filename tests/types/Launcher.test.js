import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import Launcher from '../../src/types/Launcher';

describe('Test Launcher', () => {
  chai.use(chai_spies);

  it('to have undefined original by default', () => {
    const launcher = new Launcher();
    expect(launcher.original).to.equal(undefined);
  });

  it('to keep original', () => {
    const original = () => {};
    const launcher = new Launcher(original);
    expect(launcher.original).to.equal(original);
  });

  it('to call original on launch', () => {
    const original = chai.spy(() => {});
    const launcher = new Launcher(original);
    expect(original).not.to.have.been.called();
    launcher.launch();
    expect(original).to.have.been.called();
  });

  it('to keep callbacks before and after', () => {
    const before = chai.spy(() => {});
    const after = chai.spy(() => {});
    const launcher = new Launcher();
    expect(launcher.before.length).to.equal(0);
    expect(launcher.after.length).to.equal(0);
    launcher.before.push(before);
    launcher.after.push(after);
    expect(launcher.before.length).to.equal(1);
    expect(launcher.after.length).to.equal(1);
  });

  it('to call original, before and after on launch', () => {
    const original = chai.spy(() => {});
    const before = chai.spy(() => {});
    const after = chai.spy(() => {});
    const launcher = new Launcher(original);
    launcher.before.push(before);
    launcher.after.push(after);
    expect(original).not.to.have.been.called();
    expect(before).not.to.have.been.called();
    expect(after).not.to.have.been.called();
    launcher.launch();
    expect(original).to.have.been.called();
    expect(before).to.have.been.called();
    expect(after).to.have.been.called();
  });

  it('to bind and call original, before and after on launch', () => {
    const original = chai.spy(() => {});
    const before = chai.spy(() => {});
    const after = chai.spy(() => {});
    const launcher = new Launcher(original);
    const launch = launcher.launch;
    launcher.before.push(before);
    launcher.after.push(after);
    expect(original).not.to.have.been.called();
    expect(before).not.to.have.been.called();
    expect(after).not.to.have.been.called();
    launch();
    expect(original).to.have.been.called();
    expect(before).to.have.been.called();
    expect(after).to.have.been.called();
  });

});
