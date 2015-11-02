var webpack = require('webpack');
var ngRequirePlugin = require('ngrequire-webpack-plugin');
var nodeEnvironment = process.env.NODE_ENV
var bourbon = require('node-bourbon').includePaths;
var _ = require('lodash');

var config = {
  context: __dirname + '/app',
  entry: './index.js',
  plugins: [  
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'INCLUDE_ALL_MODULES': function includeAllModulesGlobalFn(modulesArray, application) {
        modulesArray.forEach(function executeModuleIncludesFn(moduleFn) {
            moduleFn(application);
        });
      },
      ENVIRONMENT: JSON.stringify(nodeEnvironment)
    }),
    new ngRequirePlugin([__dirname + './**/*.js']),
    new webpack.optimize.DedupePlugin()
  ],
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname + '/app'
  },
  jscs: {
    // By default the loader will try to pick up a `.jscsrc`
    // file in the root of your project, but you can add any
    // valid JSCS options here too.
    //
    // See: https://github.com/jscs-dev/node-jscs#options
    validateIndentation: 2,

    // JSCS errors are displayed by default as warnings.
    // Set `emitErrors` to `true` to display them as errors.
    emitErrors: false,

    // JSCS errors do not interrupt the compilation.
    // Set `failOnHint` to `true` if you want any file with
    // JSCS errors to fail.
    failOnHint: false
  },
  module: {
    preLoaders: [{
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jscs-loader'
    }],
    loaders: [
      {test: /\.js$/, exclude: /(node_modules)/, loader: 'ng-annotate!babel'},
      {test: /\.html/, exclude: /(node_modules)/, loader: 'html-loader'},
      { test: /\.s?css$/, loader: 'style!css!sass?includePaths[]=' + bourbon },
      {test: /\.(png|jpg)$/, loader: 'url-loader?mimetype=image/png'}
    ]
  }
}

console.log('Webpack Env: ', nodeEnvironment);

switch (nodeEnvironment) {
  case 'production':
    config.output.path = __dirname + '/dist';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}));
    
    config.output.filename = '[name].js';

    config.entry = {
      bundle: './index.js',
      vendor: ['angular', 'angular-ui-router', 'lodash']
    }

    config.devtool = 'source-map';
    break;

  case 'test':
    config.entry = './index.js';
    break;

  case 'development':
    config.entry = ['./index.js', 'webpack/hot/dev-server'];
    break;
    
  default: 
    console.warn('Unknown or Undefigned Node Environment. Please refer to package.json for available build commands.');
}

console.log('RUNNING WEBPACK IN ENV: ', nodeEnvironment);

module.exports = config; 
