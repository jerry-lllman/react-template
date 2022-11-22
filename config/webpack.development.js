const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.common')

// webpack-merge 是属于叠加的那种，跟 Object.assign 不同
module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map',
	optimization: {
		// 开发模式禁用产物优化
		removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
		splitChunks: false
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [
					"thread-loader",
					"style-loader",
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
		]
	},
	devServer: {
		// 启用热更新
		hot: true,
		// 启用 gzip compression
		compress: true,
		port: 9000,
		// 路由使用 history 模式
		historyApiFallback: true,
		client: {
			overlay: {
				errors: true,
				// 关闭在浏览器中的 warning 的全屏提示
				warnings: false
			}
		}
	},
})