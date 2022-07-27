<template>
    <div>
        <Markdown
            v-model="val"
            @on-ready="onReady"
            @on-copy="onCopy"
            @on-upload-image="onUpladImage"
            @on-save="onSave"
            :height="fullHeight"
        />
    </div>
</template>

<script>
    // import Markdown from './dist/simple';
    // import Markdown from 'vue-meditor';
    import Markdown from './src/pro';
    // import Markdown from './src/simple';

    export default {
        components: {
            Markdown
        },
        mounted() {
                    const that = this
                    window.onresize = () => {
                    return (() => {
                    window.fullHeight = document.documentElement.clientHeight
                    that.fullHeight = window.fullHeight
                })()
            }
        },
        data: function () {
            return {
                val: '',
                fullHeight: document.documentElement.clientHeight
            }
        },
          watch: {
              fullHeight(val) {
                if (!this.timer) {
                  this.fullHeight = val
                  this.timer = true
                  let that = this
                  setTimeout(function() {
                    that.timer = false
                  }, 400)
                }
              }
            },
        methods: {
            onReady(data) {
                console.log(data)
            },
            onCopy(text) {
                console.log(text);
            },
            onUpladImage(file) {
                console.log(file)
            },
            onSave(data) {
                console.log(data);
            }
        }
    }
</script>

<style lang="less">

</style>
