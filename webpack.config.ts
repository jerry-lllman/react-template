import { Configuration } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// 接下来是 webpack-dev-server

module.exports = function (): Configuration {
	return {
		mode: 'none',
		entry: './src/index.jsx',
		module: {
			rules: [
				{
					test: /\.jsx$/,
					loader: 'babel-loader',
					options: {
						"presets": [
							["@babel/preset-react", {
								"runtime": "automatic"
							}]
						]
					}
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
						// postcss-preset-env
						// postcss-less
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new HTMLWebpackPlugin({
				template: 'public/index.html'
			})
		]
	}
}
