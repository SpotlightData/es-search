const {
  start,
  devServer,
  when,
  customise,
  proceed,
  bundle,
  library,
  configure,
} = require('@atecake/builder');

const pkg = require('./package.json');

start([
  configure(),
  when('build', [
    customise(() => ({ files: { input: 'src/components/index.js', output: pkg.main } })),
    bundle(),
    proceed(),
    customise(() => ({
      files: { input: 'src/components/index.js', output: pkg.module },
      build: { rollup: { format: 'esm' } },
    })),
    bundle(),
    proceed(),
    customise(() => ({
      files: { input: 'src/components', output: 'es5' },
      build: { rollup: { format: 'cjs' } },
    })),
    library(),
  ]),
  when('start', [devServer()]),
]);
