<template>
<div id="app">
  <div class="container">
    <mark-down @on-save="save" theme="OneDark" ></mark-down>
  </div>
</div>
</template>

<script>
//import MarkDown from './markdown/index' // 开发文件
import MarkDown from '../dist' // 引入打包好的文件
export default {
  name: 'app',
  components: {
    MarkDown
  },
  data() {
    return {

    }
  },
  methods:{
    save(res){
      console.log(res);
    }
  }
}
</script>

<style>
.container {
  margin: 20px auto;
  border:1px solid #ccc;
}
</style>
