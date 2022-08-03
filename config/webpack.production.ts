import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { merge } from 'webpack-merge'

const baseConfig = require('./webpack.common')

module.exports = (env: any, config: any) => {
	const { profile } = config
	return merge(
		baseConfig,
		{
			mode: 'production',
			module: {
				rules: [
					{
						test: /\.less$/,
						use: [
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
