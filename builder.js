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

start([
  configure(),
  when('build', [
    customise(() => ({ files: { input: 'src/components/index.js' } })),
    bundle(),
    proceed(),
    customise(() => ({ files: { input: 'src/components' } })),
    library(),
  ]),
  when('start', [devServer()]),
]);
