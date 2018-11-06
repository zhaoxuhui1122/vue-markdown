# vue-Markdown编辑器

[在线示例地址](http://47.99.49.57/markdown/)

GitHub :[ https://github.com/coinsuper/vue-markdown]( https://github.com/coinsuper/vue-markdown)


### 1.简介

**一款使用marked和highlight.js开发的一款markdown编辑器，目前只支持在vue项目中使用。
编辑器涵盖了常用的markdown编辑器功能，工具栏可自定义配置，也可进行二次开发。**

**效果**
![image](http://smalleyes.oss-cn-shanghai.aliyuncs.com/WechatIMG586.png)

### 2.安装

```
npm i -S vue-meditor
```

### 3.在项目中使用


```
import MarkDown from 'vue-meditor'

...
components:{
    MarkDown
}
...

<template>
    <mark-down/>
</template>
```

###  4.props

名称 | 类型|说明|默认值
---|---|---|---
title|String|编辑器标题，默认为空，不显示
titleStyle|Object|标题样式，如果自定义标题时可自行编写样式
initialValue|String|编辑器初始化内容
width|Number|编辑器宽度|
height|Number|编辑器高度，单位 px|600
theme|String|代码块主题配置，共有四个值，分别为Light、Dark、OneDark、GitHub|Light
autoSave|Boolean|是否自动保存|true
interval|Number|自动保存频率，单位毫秒|10000
toolbars|Object|工具栏配置，具体功能详见工具栏功能配置表
mode|Number|初始化显示模式 1 分屏显示 2 预览详情 3 全屏编辑

### 5.events

名称 | 说明
---|---
on-save|自动保存或者手动保存时触发，返回当前编辑器内原始输入内容和转以后的内容

### 6.工具栏配置

名称 | 说明 | 默认显示
---|---|---
strong|粗体|是
italic|斜体|是
overline |删除线|是
h1 |标题1|是
h2 |标题2|是
h3 |标题3|是
h4|标题4|否
h5 |标题5|否
h6 |标题6|否
hr |分割线|是
quote|引用|是
ul |无序列表|是
ol|有序列表|是
code |代码块|是
link |链接|是
image|image|是
table |表格|是
checked|已完成列表|是
notChecked |未完成列表|是
shift|预览|是
print |打印|否
theme|主题切换|是
fullscreen |全屏|是
exportmd|导出为*.md文件|是
importmd|导入本地*.md文件|是

### 7.其他说明
**关于保存时返回值**

```
    markdownValue // 编辑器输入的原始内容
    htmlValue // 右侧现实的问转义后的内容
    theme // 保存时的主题名字
```

**工具栏配置**

```
// 例：
const config = {
    print:false // 隐藏掉打印功能
}
<MarkDown :toolbars="config"/>
```


**关于二次开发**

原始文件在src/markdown下，可在其基础上自定义开发，也可将markdown文件夹

复制到新项目中，安装对应依赖 highlight.js和marked即可

**关于二次开发后打包**

```
// 修改webpack.config.js

  entry: './src/main.js', // main.js改为index.js
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js', // 输出文件名改为index.js或其他
    libraryTarget: 'umd',
    library: 'markdown-vue',
    umdNamedDefine: true
  },

```


### 更新日志
v0.7.0

1.修复主题无法更新的问题
2.修复文档初始化值无法动态切换的问题

v0.8.0
1.新增md文件导出和读取功能
2.修改预览部分样式
3.修改头部菜单样式
