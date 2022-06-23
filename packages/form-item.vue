<template>
  <div class="hm-form-item">
    <label
      class="hm-form-item_label"
      :style="{ width: this.Form.labelWidth }"
      >{{ label }}</label
    >
    <div class="hm-form-item_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HmFormItem',
  props: {
    label: String
  },
  inject: ['Form']
}
</script>

<style lang="less" scoped>
  .hm-form-item {
    margin-bottom: 25px;
    .hm-form-item_label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .hm-form-item_content {
      position: relative;
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
    }
  }
</style>