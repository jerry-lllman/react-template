import { merge } from 'webpack-merge'

const baseConfig = require('./webpack.common')

// webpack-merge 是属于叠加的那种，跟 Object.assign 不同
module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
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
	},
})

