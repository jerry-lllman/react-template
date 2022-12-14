
## 技术栈
  1. 使用 pnpm 进行管理  
	2. 使用 webpack 构建  
	3. 开发技术 ReactV18 + TypeScript  
	4. cypress 测试

## 开发须知
1. webpack 配置文件在 config 文件夹下
2. 需要额外安装 Cypress 程序 `npx cypress install --force`

## scripts
开发人员仅需要运行以下4个命令即可
1. `pnpm install` 安装依赖包
2. `pnpm dev` 运行开发服务器
3. `pnpm build` 打包
4. `pnpm analyz` 打包后产物分析
5. `test:e2e` 打开`Cypress` e2e 测试 （打开失败看开发须知）
6. `test:ct` 打开`Cypress` 组件测试

## todos
1. eslint 💡  
	-- 更多设置
2. webpack 配置  
	-- 图片处理 ✅  
	-- 生产环境 图片优化 ✅  
	-- sourceMap ✅  
	-- 多环境分离 ✅  
	-- 文件路径别名 ✅  
	-- 打包产物文件名添加 hash ✅  
	-- 性能分析工具 ✅  
	-- 持久化缓存 ✅  
	-- 代码分割  
	-- 并行构建 ✅  
	-- 代码压缩 swc ✅  
	-- code-split 💡  
	-- tree-shaking  
	-- 约束 loader 执行范围  
	-- 开发模式禁用产物优化 ✅  

	-- More...  
3. 打包时结合tsc 来检测代码是否正确 ✅  
	-- 原因：babel-loader 可以进行ts转译，但是不能进行错误类型检测  
4. gitcommit-hooks  
	-- pre-commit ✅  
	-- lint-staged 优化，仅对存入暂存区的文件进行lint检查 ✅  
	-- 提交时的 commit 信息规范 ✅  
5. Cypress 测试 ✅  
...