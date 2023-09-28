import 'jasmine'
const Jasmine = require('jasmine');
const reporters = require('jasmine-reporters');
const jasmineRunner = new Jasmine();

var junitReporter = new reporters.JUnitXmlReporter({
    savePath: __dirname,
    consolidateAll: true,
    filePrefix: "test-results"
});
jasmineRunner.env.addReporter(junitReporter);

jasmineRunner.loadConfig({
  spec_dir: 'test',
  spec_files: ['**/*[sS]pec.ts'],
  // helpers: ['helpers/**/*.js'],
  random: false,
  seed: null,
  stopSpecOnExpectationFailure: false
});

console.log(`Using Jasmine version: ${jasmineRunner.jasmine.version}`)

jasmineRunner.execute();
