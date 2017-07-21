# methodinjector [![npm version](https://img.shields.io/npm/v/methodinjector.svg?style=flat)](https://www.npmjs.com/package/methodinjector) [![Build Status](https://img.shields.io/travis/ranapat/methodinjector/master.svg?style=flat)](https://travis-ci.org/ranapat/methodinjector) [![Coverage Status](https://coveralls.io/repos/ranapat/methodinjector/badge.svg?branch=master)](https://coveralls.io/r/ranapat/methodinjector?branch=master) [![devDependencies Status](https://david-dm.org/ranapat/methodinjector/dev-status.svg)](https://david-dm.org/ranapat/methodinjector?type=dev)

Injects methods on methods

## Alter your methods, functions and callbacks on the fly

Modify arguments, add functionality, inject more on the fly.

### Install:

#### Install with npm
```bash
npm install methodinjector
```

#### Use standalone
```html
<script src="https://cdn.jsdelivr.net/npm/methodinjector/standalone/methodinjector.js"></script>
or
<script src="https://cdn.jsdelivr.net/npm/methodinjector/standalone/methodinjector.min.js"></script>
```

### Access the library:

#### Import
```javascript
import { methodinjector } from 'methodinjector';
```

#### Require
```javascript
const methodinjector = require('methodinjector');
```

#### Standalone
```html
<script src="https://cdn.jsdelivr.net/npm/methodinjector/standalone/methodinjector.min.js"></script>
<script>
// global methodinjector variable exists
</script>
```

### Basics:

#### What it does

Inject one or more functions before or after another function.

More or less you have this

```javascript
function main() {}
function another() {}
let combined = function () {
  main();
  another();
};
```

into this

```javascript
function main() {}
function another() {}
let combined = Injector.inject(main, another);
```

#### Dynamic add remove

You can add or remove methods on the fly.

```javascript
function main() {}
function another() {}
let combined = Injector.inject(main, another);
// if you want to alter existing one just use it instead as a first parameter
// if you use the original one you will loose the current state
combined = Inject.inject(combined, function () {});
combined = Inject.inject(combined, function () {});
combined = Inject.remove(combined, another);
```

#### Multiple instances

Every time you inject method with method you can have it merged or separate.

Separate

```javascript
function main() {}
function another() {}
function anotheranother() {}
let combined1 = Injector.inject(main, another);
let combined2 = Injector.inject(main, anotheranother);
// combined1 !== combined2
```

Combined

```javascript
function main() {}
function another() {}
function anotheranother() {}
let combined = Injector.inject(main, another);
combined = Injector.inject(combined, anotheranother);
```

#### Add before, add after

You can add one or multiple methods before or after the original one

```javascript
function main() {}
function another() {}
function anotheranother() {}
let combined = Injector.injectBefore(main, another);
combined = Injector.injectAfter(combined, anotheranother);
```

#### Cleanup and restore the original

You can restore the original instance any time you want.

```javascript
function main() {}
function another() {}
let combined = Injector.injectBefore(main, another);
combined = Injector.reset(combined);
// combined === original
```

#### Play with arguments

Any time you want any of the methods to change the arguments for the next method
you can just return array.

```javascript
function main(...args) {}
function another(...args) {
  args[0] = 'a new values';
  return args;
}
function anotheranother(...args) {
  args[1] = 'another new value';
  return args;
}
let combined = Injector.injectBefore(main, another);
combined = Injector.inject(combined, anotheranother);
combined();
// and you will have this:
// - after 'another' the first parameter will change
// - 'anotheranother' will receive the changed argument from before. after 'anotheranother' the second parameter will change.
// - 'main' will receive both arguments changed
// - this will continue with methods after the main call also
```

### More examples

[Check the examples](http://github.com/ranapat/methodinjector/blob/master/examples/src)

### Documentation

[Check the documentation](http://github.com/ranapat/methodinjector/blob/master/docs/docs.md)

### What is next

[Check the todo](http://github.com/ranapat/methodinjector/blob/master/TODO.md)

### What have changed

[Check the changelog](http://github.com/ranapat/methodinjector/blob/master/CHANGELOG.md)
