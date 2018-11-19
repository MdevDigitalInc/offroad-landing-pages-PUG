// MDEV Digital - Webpack Boilerplate[Pug + SCSS]
// Webpack 4 Configuration file
// -----------------------------------------
// DEVELOPMENT ENVIRONMENT
// ----------------------------------------

// Required Imports
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Dev Server Configuration
module.exports = merge(common, {
 mode: 'development',
 devtool: 'inline-source-map',
 devServer: {
     historyApiFallback: true,
     noInfo: true,
     contentBase: './dist'
   }
});
