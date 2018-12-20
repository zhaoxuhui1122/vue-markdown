<template>
<div id="app">
  <div class="container">
    <mark-down @on-save="save" theme="OneDark" :initialValue="initialValue"></mark-down>
  </div>
</div>
</template>

<script>
// import MarkDown from './markdown/index' // 开发文件
import MarkDown from "../build"; // 引入打包好的文件
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
            this.initialValue = "# vue-markdown";
        }, 1000);
    }
};
</script>

<style>
.container {
    margin: 20px auto;
    border: 1px solid #ccc;
}
</style>
