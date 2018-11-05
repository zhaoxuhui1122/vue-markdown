import hljs from 'highlight.js';
import marked from 'marked';
import range from './js/range';
import Print from './js/print';

hljs.initHighlightingOnLoad();

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

export default {
  name: 'markdown',
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    titleStyle: { // 标题样式
      type: Object,
      default () {
        return {}
      }
    },
    theme: { // 默认主题
      type: String,
      default: 'Light'
    },
    width: { // 宽度
      type: [Number, String],
      default: 'auto'
    },
    height: { // 高度
      type: Number,
      default: 600
    }, // 宽度
    toolbars: { // 工具栏
      type: Object,
      default () {
        return {};
      }
    },
    autoSave: { // 是否自动保存
      type: Boolean,
      default: true
    },
    interval: { // 自动保存频率 单位：毫秒
      type: Number,
      default: 10000
    },
    initialValue: { // 初始化值
      type: String,
      default: ''
    },
    mode: { // 模式 1 分屏显示 2 预览详情 3 全屏编辑
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      value: '', // 输入框内容
      timeoutId: null,
      hljsInit: null,
      indexLenth: 1,
      previewMarkdown: '',
      preview: 1, // 是否是预览状态
      isFullscreen: false,
      scrollHeight: null,
      scroll: 'markdown', // 哪个半栏在滑动
      allTools: { // 显示隐藏的工具栏
        strong: true,
        italic: true,
        overline: true,
        h1: true,
        h2: true,
        h3: true,
        h4: false,
        h5: false,
        h6: false,
        hr: true,
        quote: true,
        ul: true,
        ol: true,
        code: true,
        link: true,
        image: true,
        table: true,
        checked: true,
        notChecked: true,
        shift: true,
        fullscreen: true,
        print: false,
        theme: true,
        exportmd: true,
        importmd: true
      },
      slideDown: false,
      themeName: 'Light', // 主题名称
      lastInsert: '',
      timerId: null, // 定时器id

    };
  },
  computed: {
    editorHeight() {
      if (this.isFullscreen) {
        return window.innerHeight;
      } else {
        return this.height;
      }
    },
    tools() {
      const {
        allTools,
        toolbars
      } = this;
      return Object.assign(allTools, toolbars)
    }
  },
  mounted() {

    this.$nextTick(() => {
      this.$refs.textarea.focus();
    })
    this.init();
    //this.addListener();
  },
  methods: {
    init() {
      this.themeName = this.theme;
      const {
        autoSave,
        interval,
        theme,
        initialValue,
        mode
      } = this;
      this.value = initialValue;
      this.preview = mode;
      this.previewMarkdown = marked(initialValue, {
        sanitize: true
      });
      if (autoSave) {
        this.timerId = setInterval(() => {
          this.handleSave();
        }, interval)
      }

    },
    markdownScroll() {
      if (this.scroll === 'markdown') {
        const markdownContent = this.$refs.markdownContent;
        const preview = this.$refs.preview;
        const markdownScrollHeight = markdownContent.scrollHeight;
        const markdownScrollTop = markdownContent.scrollTop;
        const previewScrollHeight = preview.scrollHeight;
        preview.scrollTop = parseInt((markdownScrollTop / markdownScrollHeight) * previewScrollHeight);
      }
    },
    previewScroll() {
      if (this.scroll === 'preview') {
        const markdownContent = this.$refs.markdownContent;
        const preview = this.$refs.preview;
        const markdownScrollHeight = markdownContent.scrollHeight;
        const previewScrollHeight = preview.scrollHeight;
        const previewScrollTop = preview.scrollTop;
        markdownContent.scrollTop = parseInt((previewScrollTop / previewScrollHeight) * markdownScrollHeight);
      }
    },
    mousescrollSide(side) { // 设置究竟是哪个半边在主动滑动
      this.scroll = side;
    },
    insertContent(str) { // 插入文本
      const {
        preview
      } = this;
      if (preview === 2) {
        return;
      }
      this.lastInsert = str;
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      const lastFourCharts = this.value.substring(point - 4, point);
      if (lastChart != '\n' && this.value != '' && lastFourCharts != '    ') {
        str = '\n' + str;
        this.insertAfterText(str);
      } else {
        this.insertAfterText(str);
      }
    },
    getCursortPosition() { // 获取光标位置
      const textDom = this.$refs.textarea;
      let cursorPos = 0;
      if (document.selection) {
        textDom.focus();
        let selectRange = document.selection.createRange();
        selectRange.moveStart('character', -this.value.length);
        cursorPos = selectRange.text.length;
      } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        cursorPos = textDom.selectionStart;
      }
      return cursorPos;
    },
    insertAfterText(value) { // 插入文本
      const textDom = this.$refs.textarea;
      let selectRange;
      if (document.selection) {
        textDom.focus();
        selectRange = document.selection.createRange();
        selectRange.text = value;
        textDom.focus();
      } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        const startPos = textDom.selectionStart;
        const endPos = textDom.selectionEnd;
        const scrollTop = textDom.scrollTop;
        textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
        textDom.focus();
        textDom.selectionStart = startPos + value.length;
        textDom.selectionEnd = startPos + value.length;
        textDom.scrollTop = scrollTop;
      } else {
        textDom.value += value;
        textDom.focus();
      }
      this.$set(this, 'value', textDom.value);
    },
    setCaretPosition(position) { // 设置光标位置
      const textDom = this.$refs.textarea;
      if (textDom.setSelectionRange) {
        textDom.focus();
        textDom.setSelectionRange(position, position);
      } else if (textDom.createTextRange) {
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
      }
    },
    insertLine() { // 插入分割线
      this.insertContent(`\n----\n`);
    },
    insertTitle(level) { // 插入标题
      const titleLevel = {
        1: '\n#  ',
        2: '\n##  ',
        3: '\n###  ',
        4: '\n####  ',
        5: '\n#####  ',
        6: '\n######  '
      };
      this.insertContent(titleLevel[level]);
    },
    insertQuote() { // 引用
      this.insertContent('\n>  ');
    },
    insertUl() { // 无需列表
      this.insertContent('-  ');
    },
    insertOl() { // 有序列表
      this.insertContent('1. ');
    },
    insertFinished() { // 已完成列表
      this.insertContent('- [x]  ');
    },
    insertNotFinished() { // 未完成列表
      this.insertContent('- [ ]  ');
    },
    insertLink() { // 插入链接
      this.insertContent('\n[插入链接](https://github.com/coinsuper)');
    },
    insertImage() { // 插入图片
      this.insertContent('\n![image](https://noticejs.oss-cn-hangzhou.aliyuncs.com/%E6%9C%AA%E6%A0%87%E9%A2%98-3.jpg)');
    },
    insertTable() { // 插入表格
      this.insertContent(`\nheader 1 | header 2\n---|---\nrow 1 col 1 | row 1 col 2\nrow 2 col 1 | row 2 col 2\n\n`);
    },
    insertCode() { // 插入code
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      this.insertContent('\n```\n\n```');
      if (lastChart != '\n' && this.value != '') {
        this.setCaretPosition(point + 5);
      } else {
        this.setCaretPosition(point + 5);
      }
    },
    insertStrong() { // 粗体
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      this.insertContent('****');
      if (lastChart != '\n' && this.value != '') {
        this.setCaretPosition(point + 2);
      } else {
        this.setCaretPosition(point + 2);
      }
    },
    insertItalic() { // 斜体
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      this.insertContent('**');
      if (lastChart != '\n' && this.value != '') {
        this.setCaretPosition(point + 1);
      } else {
        this.setCaretPosition(point + 1);
      }
    },
    insertBg() { // 背景色
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      this.insertContent('====');
      if (lastChart != '\n' && this.value != '') {
        this.setCaretPosition(point + 5);
      } else {
        this.setCaretPosition(point + 5);
      }
    },
    insertUnderline() { // 下划线
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      this.insertContent('<u></u>');
      if (lastChart != '\n' && this.value != '') {
        this.setCaretPosition(point + 3);
      } else {
        this.setCaretPosition(point + 5);
      }
    },
    insertOverline() { // overline
      const textareaDom = this.$refs.textarea;
      const point = this.getCursortPosition();
      const lastChart = this.value.substring(point - 1, point);
      this.insertContent('~~~~');
      if (lastChart != '\n' && this.value != '') {
        this.setCaretPosition(point + 2);
      } else {
        this.setCaretPosition(point + 2);
      }
    },
    insertTitle(level) { // 插入标题
      const titleLevel = {
        1: '#  ',
        2: '##  ',
        3: '###  ',
        4: '####  ',
        5: '#####  ',
        6: '######  '
      };
      this.insertContent(titleLevel[level]);
    },
    save(e) { // ctrl+s 保存
      e.preventDefault();
      this.handleSave();
    },
    tab(e) { // 屏蔽teatarea tab默认事件
      this.insertContent('    ', this);
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    handleSave() { // 保存操作
      this.$emit('on-save', {
        markdownValue: this.value,
        htmlValue: this.previewMarkdown,
        theme: this.theme
      });
    },
    insertLine() { // 插入分割线
      this.insertContent(`\n----\n`);
    },
    toggleSlideDown() { // 显示主题选项
      this.slideDown = !this.slideDown;
    },
    setThemes(name) { // 设置主题
      this.themeName = name;
      this.slideDown = false;
    },
    enter(e) { // 回车事件
      const {
        lastInsert
      } = this;
      const list = ['-  ', '1. ', '- [ ]  ', '- [x]  ']
      if (list.includes(lastInsert)) {
        this.insertContent(lastInsert);
      }
    },
    onDelete() { // 删除时,以回车为界分割，如果数组最后一个元素为''时，将行一次插入的共嗯那个置为空，避免回车时再次插入
      const lines = this.value.split('\n');
      if (lines[lines.length - 1] == '') {
        this.lastInsert = '';
      }
    },
    print() { // 打印文件
      const dom = this.$refs.preview;
      Print(dom);
    },
    addListener() { // 事件监听，阻止保存
      this.removeListener();
      document.addEventListener('keydown', this.listener)
    },
    removeListener() {
      document.removeEventListener('keydown', this.listener)
    },
    listener(e) {
      if (e.keyCode === 83) {
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          this.handleSave();
        }
      }
    },
    importFile(e) { // 导入文件
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const {
        type
      } = file;
      if (type !== 'text/markdown') {
        alert('文件格式有误');
        return;
      }
      const reader = new FileReader();
      reader.readAsText(file, {
        encoding: 'utf-8'
      });
      reader.onload = () => {
        this.value = reader.result;
        e.target.value = '';
      }
    },
    exportMd() { // 导出文件到本地
      const {
        value
      } = this;
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/plain;charset=UTF-8,' + encodeURIComponent(value));
      pom.setAttribute('download', '未命名.md');
      pom.style.display = 'none';
      if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    }
  },
  watch: {
    value() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.previewMarkdown = marked(this.value, {
          sanitize: true
        });
      }, 30)
      this.indexLenth = this.value.split('\n').length;
      const height_1 = this.indexLenth * 22;
      const height_2 = this.$refs.textarea.scrollHeight;
      const height_3 = this.$refs.preview.scrollHeight;
      this.scrollHeight = Math.max(height_1, height_2, height_3);
    }
  },
  destroyed() { // 销毁时清除定时器
    clearInterval(this.timerId);
  }
};
