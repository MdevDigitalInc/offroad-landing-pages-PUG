// MDEV Digital - Webpack Boilerplate[Pug + SCSS]
// Webpack 4 Configuration file
// -----------------------------------------
// Common Webpack Rules
// ----------------------------------------

// Required Imports
const path = require('path')
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

// Module Exports
module.exports = {
  // Asset Splitting [ Vendor | Build ]
  entry: {
    build: './index.js'
  },
  // Output Files
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'app/[name][hash].js'
  },
  // Split Vendor | Build Assets into separate chunks
  optimization:{
    runtimeChunk: false,
    splitChunks: {
      chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    }
  },
  // Find Node Modules
  resolveLoader: {
    modules: [setPath('/node_modules')]
  },
  // Module Rules & Loaders
  module: {
    rules: [
      {
        test: /\.pug$/,
        // pretty is used to prevent minification of .pug templates
        use: [
          {loader: 'html-loader'},
          {
            loader: 'pug-html-loader?pretty=true',
            options: {
              pretty: true,

              data : {
                require: require
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
          exclude: /(node_modules)/,
          use: [{
            loader: "babel-loader",
            options: { presets: ['babel-preset-es2015'] }
          }]
      },
      // CSS Processing
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
        fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      // SASS Processing
      {
        test: /\.scss$/,
        use:
        ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }),
      },
      // Image Processing
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loaders: [ 'file-loader?context=assets&name=[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            // JPEG Processing
            mozjpeg: {
              progressive: true,
              quality: 90
            },
            // GIF Processing
            gifsicle: {
              interlaced: false,
              optimizationLevel: 2
            },
            // PNG Processing
            pngquant: {
              quality: '75-80',
              speed: 2
            },
            // SVG Processing
            svgo: {
              plugins: [
                {
                  removeViewBox: false
                },
                {
                  removeEmptyAttrs: false
                }
              ]
            }
          }
        }]
      }
    ]
  },
  // Plugins & Post Processing
  plugins: [
    // Text Extraction & Chunking
    new ExtractTextPlugin("assets/styles/styles[hash].css"),
    // [ PUG + SASS Template Registration ]
    // -----------------------------------
    // Webpack needs to know which main templates to compile.
    // For every template you want to compile you must create a new
    // instance of the HtmlWebpackPlugin (https://github.com/jantimon/html-webpack-plugin)
    // and pass the "template" parameter.
    //
    // -----------------------------------
    //
    // new HtmlWebpackPlugin({
    //   template: './path/to/template.pug',
    //   filename: 'desired/path/to/output.html'
    // }),
    //
    // -----------------------------------
    //
    // If you pass a "filename" property you can assign a name and location
    // for the processed file to be placed. Otherwise it will save it to the root with the same name
    //
    // IE: filename:'./shared/footer.html' will output the template as dist/shared/footer.html
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug'
    }),
    new CopyWebpackPlugin([
      { from: 'src/js', to: 'js', force: true }
    ])
  ],
  performance: {
    hints: 'warning'
  }
}
