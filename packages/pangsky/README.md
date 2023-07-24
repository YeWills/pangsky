# psky

## cli
- psky update
将最新的位置，更新记录到缓存；
- psky get 
```s
psky config get
```

获取 自定义缓存位置
获取 pskytplList location
- psky set
比如设置自定义缓存目录：
```s
psky config set store /Users/yewills/Documents/git/info
```

- psky use
查看本地安装过的模版

## json缓存信息
有 projectAndUsePlaceMap.json 内容就是 tpllist.json
config.json 配置信息

每次 install 好后，在项目目录下创建 .psky 目录，内容就是 tpllist.json cell

## 模版信息

```ts
// 用于内部、外部模版，以及 位置映射要素
export interface TplItemType {
  title: string;
  repository?: string; //外部模版 git地址
  insidetpl?: string; //内部模版
  path?: string; //外部模版 对应的仓库路径
  branch?: string; //外部模版在仓库中的 git branch
  usePlacePath?: string; //模版被创建到本地时，本地地址
}
```
