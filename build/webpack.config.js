var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var Config = require('../src/config');

var IS_PRODUCTION = (process.env.NODE_ENV=='production');

var exportsConfig = {
  entry: [
    './src/Entry/index.js'
  ],
  output: {
    path: path.resolve(__dirname, Config.outputPath),	// 打包路径
    publicPath: '/',				// 打包公用路径
    filename: '[name].[hash].js',				// 打包文件名
  },
  devtool: IS_PRODUCTION ? false : "#source-map",
  devServer:{
    hot:true, port:8080, inline:true
  },
  module: {
    rules: [
      {
        test: /\.css|\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
						{ loader: 'css-loader' },
            {
              loader : 'sass-loader',
              options: {
                sourceMap: true
              }
            },
						{
							loader : 'postcss-loader',
							options: {
								plugins: function () {
									return [
										require("autoprefixer")
									];
								}
							}
						}
					]
        })),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader?limit=8192&name=assets/images/[name].[ext]"  // limit=8192&
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-html-loader',
        query: {
          TITLE: Config.title,
        }
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   PRODUCTION: IS_PRODUCTION ? JSON.stringify(process.env.NODE_ENV) : false
    // }),
    new ExtractTextPlugin({ filename:(IS_PRODUCTION ? "style.[hash].css" : "style.css") }), //"assets/" + 
    new HtmlWebpackPlugin({
      filename: 'index.html', inject: 'body',
      template: 'ejs-render-loader!./src/Public/index.ejs', //?ejs=工!
      minify:{
        collapseWhitespace: true, collapseInlineTagWhitespace: true,
        minifyCSS:true, minifyJS:true, removeComments: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', minChunks: Infinity,
    }),
    new webpack.HotModuleReplacementPlugin() // 热启动
  ],
}


if(IS_PRODUCTION){
  exportsConfig.plugins.push( // 重置清空 ./dist
    new CleanWebpackPlugin([Config.outputPath],{
      root: __dirname, watch:true, allowExternal:true,
      exclude: [],  // (选填) 排除某个文件不删除 //'common.js'
    })
  )
  exportsConfig.plugins.push(new OptimizeCssAssetsPlugin()) // CSS压缩
  exportsConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }) 
  ) // JS压缩
}

module.exports = exportsConfig;