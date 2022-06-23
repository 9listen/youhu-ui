<template>
  <!-- 当前radio的label值 = 父组件传过来的value值(替换成model，因为父组件可能是app可能是radio-group) -->
  <label class="hm-radio" :class="{ 'is-checked': label == model }">
    <span class="hm-radio_input">
      <span class="hm-radio_inner"></span>
      <!-- 被隐藏了，用了_inner的样式 -->
      <input
        type="radio"
        class="hm-radio_original"
        :value="label"
        :name="name"
        v-model="model"
      />
      <!-- 这里的v-model应该和value绑定，但是value是传进来的值，所以不能直接写 -->
    </span>
    <span class="hm-radio_label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
      <!-- 匿名插槽的内容用$slots.default访问。如果radio不传内容进来，就把label渲染进页面 -->
    </span>
  </label>
</template>

<script>
export default {
  name: 'HmRadio',
  // 🌸拿到radio-group并且访问它的值
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  created () {
    // console.log(this.$parent);//可以获得父级，但是父级不一定是hm-radio-group，有一定风险
  },
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    value: null,
    name: {
      type: String,
      default: '',
    }
  },
  //双向绑定计算属性的话，必须提供他的get和set值
  computed: {
    model: {
      get () {//🌸取哪个值取决于radio是否被radio-group包裹
        //获取app组件的value
        // return this.value
        // 获取父组件radio-group的value
        // this.RadioGroup.value
        return this.isGroup ? this.RadioGroup.value : this.value;
      },
      set (value) {
        // 🌸触发父组件给当前组件注册的input事件，因为父组件有v-model,内部有value
        // 如果父组件radio-group存在就执行第一个，不存在就第二个判定
        // this.$emit('input', value)
        this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
      },
    },
    isGroup () {
      //🌸用于判断radio是否被radio-group所包裹,!!转化为布尔值
      return !!this.RadioGroup
    }
  }
}
</script>

<style lang="less" scoped>
  .hm-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    // -moz-user-select: none;
    // -webkit-user-select: none;
    // -ms-user-select: none;
    .hm-radio_input {
      position: relative;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      .hm-radio_inner {
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        &:after {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          content: "";
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.15s ease-in;
        }
      }
      .hm-radio_original {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0px;
        right: 0;
        bottom: 0;
        margin: 0;
      }
    }
    .hm-radio_label {
      font-size: 14px;
      padding-left: 10px;
    }
  }
  .hm-radio.is-checked {
    .hm-radio_input {
      .hm-radio_inner {
        border-color: #409eff;
        background: #409eff;
        &:after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  }
  .hm-radio_label {
    //文字
    color: #409eff;
  }
</style>