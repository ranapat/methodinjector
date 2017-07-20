import Injector from './Injector';

export default (...args) => {
  return Injector.inject(...args);
};
