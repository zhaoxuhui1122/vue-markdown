<template lang="html">
  <div
    :class="isFullscreen?'markdown fullscreen':'markdown' "
    ref="markdown"
    :style="{width:editorWidth+'px',height:editorHeight+'px'}"
  >
    <!-- 头部工具栏 -->
    <ul class="markdown-toolbars">
      <li><slot name="title"/></li>
      <li v-if="tools.strong" name="粗体">
        <span @click="insertStrong" class="iconfont icon-strong"></span>
      </li>
      <li v-if="tools.italic" name="斜体">
        <span @click="insertItalic" class="iconfont icon-italic"></span>
      </li>
      <li v-if="tools.overline" name="删除线">
        <span @click="insertOverline" class="iconfont icon-overline"></span>
      </li>
      <li v-if="tools.h1" name="标题1">
        <span style="font-size: 16px;" @click="insertTitle(1)">h1</span>
      </li>
      <li v-if="tools.h2" name="标题2">
        <span style="font-size: 16px;" @click="insertTitle(2)">h2</span>
      </li>
      <li v-if="tools.h3" name="标题3">
        <span style="font-size: 16px;" @click="insertTitle(3)">h3</span>
      </li>
      <li v-if="tools.h4" name="标题4">
        <span style="font-size: 16px;" @click="insertTitle(4)">h4</span>
      </li>
      <li v-if="tools.h5" name="标题5">
        <span style="font-size: 16px;" @click="insertTitle(5)">h5</span>
      </li>
      <li v-if="tools.h6" name="标题6">
        <span style="font-size: 16px;" @click="insertTitle(6)">h6</span>
      </li>
      <li v-if="tools.hr" name="分割线">
        <span @click="insertLine" class="iconfont icon-horizontal"></span>
      </li>
      <li v-if="tools.quote" name="引用">
        <span style="font-size: 16px;" @click="insertQuote" class="iconfont icon-quote"></span>
      </li>
      <li v-if="tools.ul" name="无序列表">
        <span @click="insertUl" class="iconfont icon-ul"></span>
      </li>
      <li v-if="tools.ol" name="有序列表">
        <span @click="insertOl" class="iconfont icon-ol"></span>
      </li>
      <li v-if="tools.code" name="代码块">
        <span @click="insertCode" class="iconfont icon-code"></span>
      </li>
      <li v-if="tools.notChecked" name="未完成列表">
        <span @click="insertNotFinished" class="iconfont icon-checked-false"></span>
      </li>
      <li v-if="tools.checked" name="已完成列表">
        <span @click="insertFinished" class="iconfont icon-checked"></span>
      </li>
      <li v-if="tools.link" name="链接">
        <span @click="insertLink" class="iconfont icon-link"></span>
      </li>
      <li v-if="tools.image" name="图片">
        <span @click="insertImage" class="iconfont icon-img"></span>
      </li>
      <li v-if="tools.table" name="表格">
        <span @click="insertTable" class="iconfont icon-table"></span>
      </li>
      <li v-if="tools.print" name="打印">
        <span class="iconfont icon-dayin" @click="print"></span>
      </li>
      <li v-if="tools.theme" class="shift-theme" name="代码块主题">
        <div>
          <span class="iconfont icon-yanse" @click="themeSlideDown=!themeSlideDown"></span>
          <ul :class="{active:themeSlideDown}" @mouseleave="themeSlideDown=false">
            <li @click="setThemes('Light')">Light</li>
            <li @click="setThemes('Dark')">VS Code</li>
            <li @click="setThemes('OneDark')">Atom OneDark</li>
            <li @click="setThemes('GitHub')">GitHub</li>
          </ul>
        </div>
      </li>
      <li name="导入本地文件" class="import-file" v-show="tools.importmd">
        <span class="iconfont icon-daoru" @click="importFile"></span>
        <input type="file" @change="importFile($event)" accept="text/markdown">
      </li>
      <li name="保存到本地" v-show="tools.exportmd">
        <span class="iconfont icon-download" @click="exportMd"></span>
      </li>
      <li v-if="tools.shift&&preview==2" name="全屏编辑">
        <span @click="preview=3" class="iconfont icon-md"></span>
      </li>
      <li v-if="tools.shift&&preview==3" name="分屏显示">
        <span @click="preview=1" class="iconfont icon-group"></span>
      </li>
      <li v-if="tools.shift&&preview==1" name="预览">
        <span @click="preview=2" class="iconfont icon-preview"></span>
      </li>
      <li :name="scrolling?'同步滚动:开':'同步滚动:关'">
        <span @click="scrolling=!scrolling" v-show="scrolling"  class="iconfont icon-on"></span>
        <span @click="scrolling=!scrolling" v-show="!scrolling" class="iconfont icon-off"></span>
      </li>
      <li class="empty"></li>

      <li v-if="tools.fullscreen&&!isFullscreen" name="全屏">
        <span @click="isFullscreen=!isFullscreen" class="iconfont icon-full-screen"></span>
      </li>
      <li v-if="tools.fullscreen&&isFullscreen" name="退出全屏">
        <span @click="isFullscreen=!isFullscreen" class="iconfont icon-exit-full-screen"></span>
      </li>
    </ul>
    <!-- 编辑器 -->
    <div class="markdown-content" :style="{background:preview==2?'#fff':''}">
      <div v-show="preview===1||preview===3" class="markdown-editor" ref="markdownContent"
           @scroll="markdownScroll"
           @mouseenter="mousescrollSide('markdown')">
        <ul class="index" ref="index" :style="{height:scrollHeight?`${scrollHeight}px`:'100%'}">
          <li v-for="(item,index) in indexLenth">{{index+1}}</li>
        </ul>
        <textarea
          v-model="value"
          @keydown.tab="tab"
          @keyup.enter="enter"
          @keyup.delete="onDelete"
          ref="textarea"
          :style="{height:scrollHeight?`${scrollHeight}px`:'100%'}"
        ></textarea>
      </div>
      <div v-show="preview==1" class="empty" style="width:12px;"></div>
      <div
        v-show="preview===1||preview===2"
        :class="`markdown-preview ${themeName}`"
        ref="preview"
        @scroll="previewScroll"
        @mouseenter="mousescrollSide('preview')">
        <div  v-html="html"
              ref="previewInner" ></div>
      </div>
    </div>
<!--    预览图片-->
    <div :class="['preview-img',previewImgModal?'active':'']">
      <span class="close" @click="previewImgModal=false">关闭</span>
      <img :src="previewImgSrc" :class="[previewImgMode]" alt="">
    </div>
  </div>
</template>

<script>
  import markdown from './markdown';

  export default markdown;
</script>

<style lang="less">
  @import "font/iconfont.css";
  @import "./css/theme";
  @import "css/light";
  @import "css/dark";
  @import "css/one-dark";
  @import "css/gitHub";
  @import "css/index";
</style>
