import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const SpritesmithPlugin = require('webpack-spritesmith')

console.log(path.resolve('.', 'dist'))

module.exports = {
	entry: '/src/main.tsx',
	output: {
		filename: '[name].js',
		path: path.resolve('.', 'dist')
	},
	module: {
		rules: [
			// js文件 ts jsx 都通过 babel 进行处理
			{
				test: /\.(ts|js|tsx|jsx)$/,
				loader: 'babel-loader',
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
		modules: ['node_modules', 'assets'],
		// 别名
		alias: {
			'@': path.resolve('.', '/src'),

		}
	},
	plugins: [
		// 将多图片放到一张雪碧图中 如果使用的是 http2 则无此雪碧图的必要
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve('.', 'src/icons'),
				glob: '*png'
			},
			target: {
				image: path.resolve('.', 'src/assets/sprite.png'),
				css: path.resolve('.', 'src/assets/sprite.less')
			}
		}),
		new ESLintWebpackPlugin({
			// extensions 默认 js
			extensions: ['.ts', '.js', '.tsx', '.jsx'],
			fix: true
		}),
		// 生成 html 模版，将资源自动引入
		new HTMLWebpackPlugin({
			template: 'public/index.html'
		})
	]
}