# psky
psky，盘古(pangu)开天(sky)，引申为创建、生成之意。
用于管理和生成各种项目、脚手架、ui组件库模版。

# 安装与构建
根目录下执行 pnpm i && pnpm build

## 使用
```s
npm i psky -g
psky my-app
```

## 模版
内置模版，在`packages/pangsky/templates`中，为了方便集成更多模版，另外的模版放到[psky-template](https://gitee.com/mayising/psky-template.git)上维护。

## 集成模版
本工具可以很方便地集成更多模版，执行下面命令：
```s
psky config get
```
获取模版配置文件`tplList.json`,修改文件如下，即可轻松集成管理自己的模版：
`repository`是模版仓库地址 gitee，因为下载流畅。
```json
{
  "tplList": [
    {
      "title": "一个模版描述",
      "repository": "https://gitee.com/mayising/tpltest"
    }
  ]
}
```
假如模版在仓库某个路径下，则配置为：
```json
{
  "tplList": [
    {
      "title": "一个模版描述",
      "repository": "https://gitee.com/mayising/tpltest",
      "path": "/react-demo"
    }
  ]
}
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











cli install 的时候，有配置，就读取，

物理存储位置，单独用一个configjson

cli 创建时，先读取本地配置，看是否有安装同样的版本，(git和branch 如果完全命中就直接提示，如果只有git命中，也给一个提示，是否终止)
安装成功的时候，暂时都直接覆盖最新地址，（再配置一个config，可以不覆盖原来的位置）（再配置一个cli 命令，用来专门更新存储地址位置）


配置一个命令，用来设置 tpl 地址；