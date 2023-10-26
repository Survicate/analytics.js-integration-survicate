// Karma configuration
// Generated on Wed Oct 25 2023 16:45:07 GMT+0200 (Central European Summer Time)
'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    files: [
      './test/index.test.js'
    ],
    frameworks: ['mocha', 'browserify'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-browserify'
    ],
    preprocessors: {
      './test/index.test.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: []
    }
  });
};
