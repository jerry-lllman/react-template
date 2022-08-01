import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from 'webpack-merge'

const baseConfig = require('./webpack.common')

module.exports = merge(
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
			new MiniCssExtractPlugin()
		]
	}
) 