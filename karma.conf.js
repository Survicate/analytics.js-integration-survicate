/* eslint-env node */
'use strict';

module.exports = function(config) {
  config.set({
    files: [
      'test/**/*.test.js'
    ],

    browsers: ['PhantomJS_custom'],

    customLaunchers: {
      PhantomJS_custom: {
        base: 'PhantomJS',
        flags: ['--ignore-ssl-errors=true']
      }
    },

    frameworks: ['browserify', 'mocha'],

    reporters: ['spec', 'coverage'],

    preprocessors: {
      'test/**/*.js': 'browserify'
    },

    client: {
      mocha: {
        grep: process.env.GREP,
        reporter: 'html',
        timeout: 10000
      }
    },

    browserify: {
      debug: true,
      transform: [
        [
          'browserify-istanbul',
          {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    },

    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html' },
        { type: 'json' }
      ]
    }
  });
};
