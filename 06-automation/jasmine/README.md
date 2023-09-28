# jasmine

- [docs](https://jasmine.github.io/)

- dependencies: `npm i jasmine jasmine-node`
- directory with tests can be _anything_
- npm script: `"test": "jasmine-node spec"`, fire
  - however, `jasmine-node` holds jasmine v1.3 :( so need to [run a script](run.js) to use a certain version of jasmine (v3.4)

## examples

- [simple example](spec/calc.spec.js)
- [node `assert`](spec/node-assert.spec.js)
- [custom matchers](spec/custom-matchers/custom-matchers.spec.js) + [definitions](spec/custom-matchers/jasmine-custom-matchers.js)
  - [custom matchers under typescript (with overriding global namespace)](spec/custom-matchers/jasmine-custom-matchers.ts)
  - [blogpost](https://content.pivotal.io/blog/writing-beautiful-specs-with-jasmine-custom-matchers)
- [spy](spec/spy.spec.js)
  - [docs](https://jasmine.github.io/api/3.4/Spy)
  - anonymous mock fn
  - mock fn
  - mock object method
  - return values
  - return async values (promise-based)

----

## joi

- dependencies: `npm i @hapi/joi`
- [docs](https://www.npmjs.com/package/@hapi/joi), [v15.1 API reference](https://github.com/hapijs/joi/blob/v15.1.0/API.md)
- [joi schemas](spec/joi/schema.js)
- [joi validation tests](spec/joi/joi.spec.js)

----

## ajv

- dependencies: `npm i ajv`
- [docs](https://www.npmjs.com/package/ajv)
- [`ajv` json schemas](spec/json-schema/schema.js)
- [`ajv` validation tests](spec/json-schema/schema.js)
- [hardcore email regex](https://emailregex.com/) + [online escaping tool](https://www.freeformatter.com/javascript-escape.html), primitive email regex: `"pattern": "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"`
