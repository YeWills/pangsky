# {{pkgName}}
{{pkgName}}工程，采用monorepo方式，基于pnpm lerna turbo ts。
{{{ description }}}

# 安装与构建
根目录下执行 pnpm i && pnpm build

开发：
根目录下执行 pnpm dev
或进入具体pkg下，执行 pnpm dev
pnpm dev 可以监听包编译，时刻输出最新代码

# 发布

## tsc生成生命文件
如果需要生成声明文件，使用 pnpm run tsc

## pnpm run release

# 查看工程是否正常

pnpm install
pnpm run build
pnpm run tsc
pnpm run doc
pnpm run release:d  #debugger 模式
npx {{pkgName}} --version # 测试查看工具版本
npx {{pkgName}} test # 测试查看工具能否使用


