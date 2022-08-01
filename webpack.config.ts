import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'

const SpritesmithPlugin = require('webpack-spritesmith')

module.exports = function () {

	return {
		mode: "development",
		entry: './src/main.ts',
		devtool: "source-map",
		module: {
			rules: [
				// js文件
				{
					test: /\.(ts|js|tsx|jsx)$/,
					loader: 'babel-loader',
				},
				{
					test: /\.less$/,
					use: [
						// MiniCssExtractPlugin.loader 和 style-loader 只能二选一
						process.env.NODE_ENV === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								importLoaders: 1
							}
						},
						"postcss-loader",
						"less-loader"
						// postcss-preset-env postcss 
						// postcss-less
					]
				},
				{
					test: /\.(png|jpg|jpeg)$/,
					// webpack4 use: ['file-loader']
					type: 'asset/resource'
				},
				{
					test: /\.(png|jpg|jpeg)$/,
					// webpack4 use: ['url-loader']	
					type: 'asset',
					parser: {
						// 小于 1024 的就不处理成URL形式，会被编译成 base64
						dataUrlCondition: {
							maxSize: 1024
						}
					}
				},
				{
					test: /\.svg$/i,
					// webpack4 use: [raw-loader]
					type: 'asset/source'
				},
				
			]
		},
		resolve: {
			// 导入时不用带文件后缀
			extensions: ['.ts', '.js', '.tsx', '.jsx'],
			modules: ['node_modules', 'assets']
		},
		devServer: {
			// 启用热更新
			hot: true,
			// 启用 gzip compression
			compress: true,
			port: 9000,
		},
		plugins: [
			// 将多图片放到一张雪碧图中 如果使用的是 http2 则无此雪碧图的必要
			new SpritesmithPlugin({
				src: {
					cwd: path.resolve(__dirname, 'src/icons'),
					glob: '*png'
				},
				target: {
					image: path.resolve(__dirname, 'src/assets/sprite.png'),
					css: path.resolve(__dirname, 'src/assets/sprite.less')
				}
			}),
			new ESLintWebpackPlugin({
				// extensions 默认 js
				extensions: ['.ts', '.js', '.tsx', '.jsx'],
				fix: true
			}),
			// 压缩css
			new MiniCssExtractPlugin(),
			// 生成 html 模版，将资源自动引入
			new HTMLWebpackPlugin({
				template: 'public/index.html'
			})
		]
	}
}

  // "build": "webpack --config prod.config.js"
