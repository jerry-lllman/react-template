const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.common')

const TerserPluginOptions = {
	// 压缩方式
	// 1. 默认的TerserPlugin.terserMinify
	// 2. TerserPlugin.uglifyJsMinify
	// 3. TerserPlugin.swcMinify
	// 4. TerserPlugin.esbuildMinify
	minify: TerserPlugin.swcMinify, // 使用swc后速度提升 20%
	// 不将注释单独抽离
	extractComments: false,
	terserOptions: {
		format: {
			// 删除注释
			comments: false
		},
		compress: {
			drop_console: true,
		}
	}
}

module.exports = (env, config) => {
	const { profile } = config
	return merge(
		baseConfig,
		{
			mode: 'production',
			optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin(TerserPluginOptions)
				]
			},
			module: {
				rules: [
					{
						test: /\.less$/,
						use: [
							// 针对 MiniCssExtractPlugin 出错，暂时未找出解决办法
							// {
							// 	loader: 'thread-loader',
							// 	options: {
							// 		workerParallelJobs: 50,
							// 		poolRespawn: false	
							// 	}
							// },
							MiniCssExtractPlugin.loader,
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
			plugins: [
				new MiniCssExtractPlugin({
					// css 输出添加hash
					filename: 'styles/[name]-[contenthash:12].css'
				}),
				// 打包分析报告
				new BundleAnalyzerPlugin({
					analyzerMode: profile ? 'server' : 'disabled',
				})
			]
		}
	)
}
