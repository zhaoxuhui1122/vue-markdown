<template>
    <div>
        <Markdown
            v-model="val"
            @on-ready="onReady"
            @on-copy="onCopy"
            @on-upload-image="onUpladImage"
            @on-save="onSave"
            @on-error="onError"
            :height="500"
            :split="false"
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
        data: function () {
            return {
                val: null
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
            },
            onError(err) {
                console.log(err)
            }
        }
    }
</script>

<style lang="less">

</style>
