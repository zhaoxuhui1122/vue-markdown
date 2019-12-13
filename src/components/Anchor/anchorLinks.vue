<template>
  <div>
    <!-- 递归 render -->
    <template v-for="child in item">
      <AnchorLink :href="`#${child.anchor}`" :title="child.text" :key="child.anchor">
        <template v-if="child.children">
          <AnchorLinks :item="child.children"></AnchorLinks>
        </template>
      </AnchorLink>
    </template>
  </div>
</template>
            
</div>
  
</template>
<script>
import AnchorLink from './anchorLink'

export default {
  mounted() {
    console.log(this.item, 'links')
  },
  props: {
    item: {
      type: Array,
      default: []
    }
  },
  name: 'AnchorLinks',
  components: { AnchorLink }
}
</script>
<style lang="less" scoped>
@import './anchor.less';
</style>