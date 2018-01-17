# ejs-html-build
基于Webpack的 EJS模板引擎，可用于构建多个重复内容的 HTML静态内容文件

[![webpack](https://img.shields.io/badge/webpack-v3.10.0-green.svg)](http://webpack.github.io)
[![ejs-render-loader](https://img.shields.io/badge/ejs-render-loader-v1.0.0-green.svg)](https://www.npmjs.com/package/ejs-render-loader)

### 应用场景
有时候需要做一个或多个静态的专题页面，静态文件头部和尾部是公共元素，如果需要修改一处公共元素，则需将所有的静态页面一个个修改，效率极差，此方案由此诞生。仅需要修改配置文件即可实现快速生成静态页面，并且包含了SCSS补全、压缩、哈希命名, html压缩，热更新 等配置，调试环境默认可查看 sourcemap，生产环境默认去除 sourcemap（更多配置请阅读 ./build/webpack.config.js）

### 安装 & 运行调试
```
npm install
npm run ejs:dev // 调试
npm run ejs:build // 构建
```

### 使用说明
```
./src/config.js 查看配置文件
./src/Public/index.ejs 修改 ejs 及 scss 样式
./src/Entry/index.js 入口文件在此处主要用于EJS文件及CSS样式的热更新加载
更多配置请阅读 ./build/webpack.config.js
```