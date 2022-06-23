<template>
  <div class="hm-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HmRadioGroup',
  provide () {
    // hmRadioGroup提供了一个属性名就叫RadioGroup,属性值就是this,好处是在子孙组件中通过inject可以拿到该值
    return {
      RadioGroup: this
    }
  },
  props: {
    // hm-radio-group接收到了value值，将来还需触发当前组件的input事件，
    // 使用provide祖先提供与inject子组件接收，开发组件库的时候方便使用，平时不推荐用，祖先组件向子孙组件注册依赖,provide与consumer
    value: null,
  }
}
</script>

<style>
</style>