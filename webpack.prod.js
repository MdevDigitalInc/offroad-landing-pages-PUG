// MDEV Digital - Webpack Boilerplate[Pug + SCSS]
// Webpack 4 Configuration file
// -----------------------------------------
// PRODUCTION ENVIRONMENT
// ----------------------------------------

// Require Imports
const webpack = require('webpack')
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Webpack Merge Configuration
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin");

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

// Robots.TXT Configuration
const robotOptions = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: ["/search"],
      crawlDelay: 2
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/"
    }
    ],
    sitemap: "http://example.com/sitemap.xml",
    host: "http://example.com"
}

// Module Exports
module.exports = merge(common, {
  // Set Webpack Mode
  mode: 'production',
  // Plugins & Post Processing
  plugins: [
    // Clean ./dist Folder
    new CleanWebpackPlugin('dist', {} ),
    // Generate Robots.TXT
    new RobotstxtPlugin(robotOptions),
    // Set NODE_ENV to Production
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true,}, reduceIdents: false, discardDuplicates: false, autoprefixer: false },
      canPrint: true
    })
  ]
});
