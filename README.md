# Friends

WOW, there ARE my friends

## 要求

嘛, 就两条

- 能打的开
- 是朋友
- ~~不是不能加的东西~~

~~好了别说了快 pr 我~~

## 我

- 名字
  - NEVER 迷の小窝
- 链接 (任选其一)
  - https://blog.never.pet
  - https://never.pet
- 介绍 (可选)
  - 没有简介的迷の生物
- [头](./src/me/avatar.png) (可选)
  - https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/me/avatar.png
- 背景 (可选)
  - [](./src/me/bg/neko.jpg)
    - https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/me/bg/neko.jpg

## 你

1. Fork && `git clone`
2. `cd Friends && code src/friends.yml`
3. 按照如下格式

```
"{站点名称}":
  link: {链接}
  img: {图片, 可以是外链或者是本地文件}
  slogan: {简短的介绍}
```

- 如果是图片, 请放在 `src/friends`并用站点名称/二级域名作为名字, 简短可识别为佳
- 如果是链接, 请确保带上`https://`
- 如果没有, 请填写`null`

4. `yarn && yarn build` (可选)
   - 用于确保提交的内容是可用的, 如果不方便也无所谓

## 更新时间

合并后`workflow`将会即时开始, 更新时间看 jsDelivr 更新 (大约 12h)
