<template>
  <div id="app">
    <div class="container">
      <h1>vue-markdown编辑器组件</h1>
      <a target="_blank" href="https://zhaoxuhui1122.github.io/vue-markdown/">使用文档</a>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="content">
        <mark-down @on-save="save" theme="OneDark" :initialValue="initialValue"></mark-down>
      </div>
    </div>
  </div>
</template>

<script>
  // import MarkDown from './markdown/index' // 开发文件
  // import MarkDown from "../build"; // 引入打包好的文件
  import MarkDown from 'vue-meditor';

  import doc from './doc';
  export default {
    name: "app",
    components: {
      MarkDown
    },
    data() {
      return {
        initialValue: ""
      };
    },
    methods: {
      save(res) {
        console.log(res);
      }
    },
    mounted() {
      setTimeout(() => {
        this.initialValue = doc;
      }, 1000);
    }
  };

</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    width: 1200px;
    margin: 0 auto;

    h1 {
      font-size: 26px;
      font-weight: 400;
      margin: 12px 0;
    }

    a {
      display: block;
      background-color: #f8f8f9;
      border-radius: 4px;
      padding: 8px 16px;
      border: 1px solid #edeff0;
      border-radius: 4px;
      margin-bottom: 20px;
      text-decoration: none;
      color: #2d8cf0;
    }

    ul {
      list-style: none;
    }

    .content {
      border: 1px solid #ccc;
    }
  }

</style>
