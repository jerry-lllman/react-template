import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = function () {
	return {
		mode: "development",
		entry: './src/index.jsx',
		module: {
			rules: [
				{
					test: /\.jsx$/,
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
				}
			]
		},
		devServer: {
			// 启用热更新
			hot: true,
			// 启用 gzip compression
			compress: true,
			port: 9000,
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new HTMLWebpackPlugin({
				template: 'public/index.html'
			})
		]
	}
}

  // "build": "webpack --config prod.config.js"
