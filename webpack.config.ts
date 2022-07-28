import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = function () {
	return {
		mode: "development",
		entry: './src/main.ts',
		module: {
			rules: [
				{
					test: /\.tsx$/,
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
		resolve: {
			extensions: ['.ts', '.js', '.tsx', '.jsx']
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
