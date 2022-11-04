const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const threadLoaderOptions = {
	workerParallelJobs: 50,
	poolRespawn: false,
	poolParallelJobs: 50,
}

module.exports = {
	entry: '/src/main.tsx',
	output: {
		// 每次打包输出之前都删除dist
		clean: true,
		filename: 'js/[name]-[contenthash:12].bundle.js',
		path: path.resolve('.', 'dist'),
		// 图片打包路径修改到 images 文件夹内
		assetModuleFilename: 'images/[contenthash:12][ext][query]'
	},
	cache: {
		// 支持 'memory' | 'filesystem' filesystem 为持久化缓存
		type: 'filesystem',
	},
	optimization: {
		// 将 webpack 运行时代码（ webpack 骨架 ）分离出去。可降低 hash 变更导致浏览器缓存失效的影响
		runtimeChunk: true
	},
	module: {
		rules: [
			// js文件 ts jsx 都通过 babel 进行处理
			{
				test: /\.(ts|js|tsx|jsx)$/,
				use: [
					{
						loader: 'thread-loader',
						options: threadLoaderOptions
					},
					'babel-loader'
				],
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
		new ESLintWebpackPlugin({
			// extensions 默认 js
			extensions: ['.ts', '.js', '.tsx', '.jsx'],
			fix: true
		}),
		// 生成 html 模版，将资源自动引入
		new HTMLWebpackPlugin({
			template: 'public/index.html'
		}),
	]
}