/// <reference path="../typings/custom.system.d.ts" />
System.config({
  paths: {'*': '*.js?v=<%= VERSION %>'}
});

System.import('./app')
  .catch(e => console.error(e.stack));