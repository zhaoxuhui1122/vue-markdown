export default `# vue-Markdown编辑器

[在线示例地址](https://zhaoxuhui1122.github.io/vue-markdown/)

GitHub :[https://github.com/zhaoxuhui1122/vue-markdown]( https://github.com/zhaoxuhui1122/vue-markdown)


### 1.简介

**一款使用marked和highlight.js开发的一款markdown编辑器，目前只支持在vue项目中使用。**

**编辑器涵盖了常用的markdown编辑器功能，工具栏可自定义配置，也可进行二次开发。**


**效果**
![image](/WechatIMG586.png)

### 2.安装

\`\`\`
npm i -S vue-meditor

或

直接复制对应的组件到项目目录内 （推荐）
\`\`\`

### 3.在项目中使用


\`\`\`
import MarkDown from 'vue-meditor'

...
components:{
    MarkDown
}
...

<template>
    <mark-down/>
</template>
\`\`\`

###  4.props

名称 | 类型|说明|默认值
---|---|---|---
initialValue|String|编辑器初始化内容
width|Number|编辑器宽度|
height|Number|编辑器高度，单位 px|600
theme|String|代码块主题配置，共有四个值，分别为Light、Dark、OneDark、GitHub|Light
autoSave|Boolean|是否自动保存|true
interval|Number|自动保存频率，单位毫秒|10000
toolbars|Object|工具栏配置，具体功能详见工具栏功能配置表
exportFileName|String|导出文件的名称|未命名文件

### 5.events

名称 | 说明
---|---
on-save|自动保存或者手动保存时触发，返回当前编辑器内原始输入内容和转以后的内容
on-paste-image|粘贴图片，返回当前粘贴的file文件
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

\`\`\`
    value // 编辑器输入的原始内容
    html // 右侧现实的问转义后的内容
    theme // 保存时的主题名字
\`\`\`
**标题配置**

\`\`\`
支持配置编辑器名称，提供了name=title的slot插槽
\`\`\`


**工具栏配置**

\`\`\`
// 例：
const config = {
    print:false // 隐藏掉打印功能
}
<MarkDown :toolbars="config"/>
\`\`\`
**优化代码体积**


\`\`\`
项目中为了达到代码高亮显示，需要用到highlight.js,
由于highlight.js体积过于庞大，项目中按需加载了部分常用的程序语言，
可根据需求自行配置，配置目录位于/markdown/js/hljs内
\`\`\`


### 更新日志
**1.3.0**
- 支持配置marked的markedOptions，感谢[dkvirus](https://github.com/dkvirus)提出的[issues#12](https://github.com/zhaoxuhui1122/vue-markdown/issues/12)和具体的解决办法

**1.2.1**
- 支持theme、width、heigh动态切换

**v1.2.0**
- 优化代码体积，按需加载highlight.js，较少了三分之二的代码体积
- 新增图片粘贴功能
- 增加图片预览功能
- 修复部分bug

**v1.0.0**
- 优化代码体积，按需加载highlight.js，较少了三分之二的代码体积
- 新增图片粘贴功能
- 增加图片预览功能
- 修复部分bug

**v0.9.3**

- 解决初始化值initialValue无法动态改变的问题
- 修改了打包配置

**v0.8.0**

- 新增md文件导出和读取功能
- 修改预览部分样式
- 修改头部菜单样式

**v0.7.0**

- 修复主题无法更新的问题
- 修复文档初始化值无法动态切换的问题


`
