# psky
盘古开天劈地，引申为创建、生成之意。
通过命令方式生成各种项目、脚手架、ui组件库 模版。

# 安装与构建
根目录下执行 pnpm i && pnpm build

# 使用
```s
npm i psky -g
psky my-app
```

## 调试

### 通过yalc调试
本项目根目录下执行
```s
pnpm run build
pnpm run yalc
```

在其他任意一个目录下创建调试项目：
```s
mkdir psky-debug
cd psky-debug
npm init
#如果后续 psky @pskyjs/utils 依赖的包增加，就增加安装
npm i ora@5.4.1 chalk@4.1.2 git-clone@0.2.0
yalc add psky @pskyjs/utils
```

后续更新时，本项目根目录下执行
```s
pnpm run build
pnpm run yalc
```
调试项目
```s
yalc update
```

调试：
调试项目下
```s
mkdir test
cd test
node ../node_modules/psky/bin/create-psky.js
```


### 通过局部psky命令调试
在其他任意一个目录下创建调试项目：
```s
mkdir psky-debug
npm init
npm i psky
mkdir test
cd test
npx psky
```






