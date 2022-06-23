<template>
  <!-- is-checked样式判断：如果没有group就是model，是一个布尔值，如果是group，
  就判断当前label是否在model里面，如果在就选中 -->
  <label class="hm-checkbox" :class="{ 'is-checked': isChecked }">
    <span class="hm-checkbox_input">
      <!-- 去掉原始样式，使用_inner的样式 -->
      <span class="hm-checkbox_inner"></span>
      <!-- 有group就有label -->
      <input
        type="checkbox"
        class="hm-checkbox_original"
        :name="name"
        v-model="model"
        :value="label"
      />
      <!-- 🌞单个input框没必要给value值，只要给v-model控制它的值,model还是和父组件传进来的value双向绑定
      但是有group的时候就要加value值。这里的v-model应该和value绑定，但是value是传进来的值，所以不能直接写 
      单个input控制的是true/false值，多个控制的是一个数组 -->
    </span>
    <span class="hm-checkbox_label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
      <!--$slots.default是默认插槽的值存在与否  -->
    </span>
  </label>
</template>

<script>
export default {
  name: 'HmCheckbox',
  inject: {
    CheckboxGroup: {
      default: ''
    }
  },
  computed: {
    isGroup () {
      return !!this.CheckboxGroup
    },
    model: {
      get () {
        return this.isGroup ? this.CheckboxGroup.value : this.value
      },
      set (value) {
        return this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
      },
    },
    isChecked () {//model在group组里面是数组
      return this.isGroup ? this.model.includes(this.label) : this.model
    },
  },
  props: {
    value: {//复选框value这里限定了值，因为你单独给checkbox绑定，绑定布尔值
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    }
  },

}
</script>

<style lang="less" scoped>
  .hm-checkbox {
    position: relative;
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    margin-right: 30px;
    .hm-checkbox_input {
      position: relative;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      .hm-checkbox_inner {
        position: relative;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        background-color: #fff;
        z-index: 1;
        transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
          background-color 0.25s, cubic-bezier(0.71, -0.46, 0.29, 1.46);
        &:after {
          position: absolute;
          box-sizing: content-box;
          content: "";
          border: 1px solid #fff;
          border-left: 0;
          border-top: 0;
          width: 3px;
          height: 7px;
          left: 4px;
          top: 1px;
          transform: rotate(45deg);
          transform-origin: center;
          transition: transform 0.15s ease-in 0.05s;
        }
      }
      .hm-checkbox_original {
        opacity: 0;
        outline: none;
        position: absolute;
        left: 10px;
        margin: 0;
        width: 0;
        height: 0;
        z-index: -1;
      }
    }
    .hm-checkbox_label {
      display: inline-block;
      padding-left: 10px;
      line-height: 19px;
      font-size: 14px;
    }
  }
  //   选中时候的样式
  .hm-checkbox.is-checked {
    .hm-checkbox_input {
      .hm-checkbox_inner {
        background-color: #409eff;
        border-color: #409eff;
      }
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
    .hm-checkbox_label {
      color: #409eff;
    }
  }
</style>