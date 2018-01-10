//module.exports = config => {
//  const tests = 'tests/**/*.test.ts';
/*  config.set({
    files: [
      {
        pattern: tests,
      },
    ],
    frameworks: ['mocha', 'karma-typescript'],
    plugins: [
      'karma-sourcemap-loader',
      'karma-typescript',
      'karma-webpack'
    ],
    preprocessors: {
      [tests]: ['webpack', 'sourcemap', 'karma-typescript'],
    },
    //reporters: ['progress', 'karma-typescript'],
    singleRun: true,
    webpack: {
      devtool: 'cheap-eval-source-map',
      module: {
        rules: [
          {
            exclude: /^node_modules$/,
            test: /\.tsx?$/,
            use: [
              'babel-loader',
              'ts-loader'
            ]
          }
        ]
      }
    }
  });
};*/

export default function(config) {
  //const tests: string = 'tests/**/*.test.ts';
  const tests: string = 'tests/**/*.test.js';

  process.env.BABEL_ENV = 'karma';

  config.set({
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: 'build',
      reporters: [{ type: 'html' }, { type: 'lcov' }],
    },
    files: [
      {
        pattern: tests,
      },
    ],
    frameworks: ['mocha'/*, 'chai'*/],
    preprocessors: {
      [tests]: ['webpack', 'sourcemap'],
    },
    reporters: ['coverage'],
    singleRun: true,
    webpack: {
      devtool: 'cheap-eval-source-map',
      module: {
        rules: [
          {
            exclude: /^node_modules$/,
            test: /\.tsx?$/,
            use: [
              'babel-loader',
              'ts-loader'
            ]
          }
        ]
      }
    }
  });
};
