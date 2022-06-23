<template>
  <div class="hm-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HmCheckboxGroup',
  props: {
    value: {
      type: Array,
    }
  },
  provide () {//提供出去等子组件inject接收
    return {
      CheckboxGroup: this,
    }
  }
}
</script>

<style lang="less" scoped>
</style>