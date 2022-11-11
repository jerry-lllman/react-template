const crypto = require('crypto')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

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

const topLevelFrameworkPaths = []
const visitedFrameworkPackages = new Set()

const addPackagePath = (packageName, relativeToPath) => {
	try {
		if (visitedFrameworkPackages.has(packageName)) {
			return
		}
		visitedFrameworkPackages.add(packageName)

		const packageJsonPath = require.resolve(`${packageName}/package.json`, {
			paths: [relativeToPath],
		})

		const directory = path.join(packageJsonPath, '../')

		if (topLevelFrameworkPaths.includes(directory)) return
		topLevelFrameworkPaths.push(directory)

		const dependencies = require(packageJsonPath).dependencies || {}
		for (const name of Object.keys(dependencies)) {
			addPackagePath(name, directory)
		}
	} catch (_) {
	}
}

function isModuleCSS(module) {
  return (
    // mini-css-extract-plugin
    module.type === `css/mini-extract` ||
    // extract-css-chunks-webpack-plugin (old)
    module.type === `css/extract-chunks` ||
    // extract-css-chunks-webpack-plugin (new)
    module.type === `css/extract-css-chunks`
  )
}


// 收集 react/react-dom 的所有依赖
for (const packageName of ['react', 'react-dom']) {
	addPackagePath(packageName, '.')
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
				],
				splitChunks: {
					name: 'common',
					// 包含 异步 和 initial 的（只要符合规则，都将被分成单独包）
					chunks: 'all',
					minChunks: 2, // 最少被两个 chunk 引用的模块就可以被分包
					minSize: 0,
					maxSize: 160000,
					// cacheGroups 是自继承 splitChunks 的规则
					cacheGroups: {
						// 将 react 框架单独分包
						framework: {
							chunks: 'all',
							name: 'framework',
							test(module) {
								const resource = module.nameForCondition && module.nameForCondition()
								return resource
									? topLevelFrameworkPaths.some((pkgPath) => resource.startsWith(pkgPath))
									: false
							},
							priority: 40,
							// 告诉 webpack 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项，并始终为此缓存组创建 chunk。
							enforce: true
						},
						// 针对比较大的lib进行打包
						lib: {
							test(module) {
								return (module.size() > 160000 && /node_modules[/\\]/.test(module.nameForCondition()) || '')
							},
							name(module) {
								const hash = crypto.createHash('sha1')
                if (isModuleCSS(module)) {
                  module.updateHash(hash)
                } else {
                  if (!module.libIdent) {
                    throw new Error(
                      `Encountered unknown module type: ${module.type}. Please open an issue.`
                    )
                  }
                  hash.update(module.libIdent({ context: '.' }))
                }

                return hash.digest('hex').substring(0, 8)
							},
							priority: 30,
							minChunks: 1,
							reuseExistingChunk: true
						}
					}
				}
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
