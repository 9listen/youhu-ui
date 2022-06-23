<template>
  <!-- 如果有后缀为suffix的样式，就会显示图标 -->
  <!-- 三元表达式  如果传了show-password,判断 密码的显示。如果不传，不判断 -->
  <div class="hm-input" :class="{ 'hm-input--suffix': showSuffix }">
    <input
      class="hm-input_inner"
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
      :clearable="clearable"
    />
    <span class="hm-input_suffix" v-if="showSuffix">
      <i
        class="hm-input_icon hm-icon-qingkong"
        v-if="clearable && value"
        @click="clear"
      ></i>
      <i
        class="hm-input_icon hm-icon-yanjing"
        :class="{ 'hm-icon-yanjing-active': passwordVisible }"
        v-if="showPassword"
        @click="handlePassword"
      ></i>
    </span>
    <!-- v-model语法糖内部步骤：value+input事件 -->
  </div>
</template>

<script>
export default {
  name: 'HmInput',
  data () {
    return {
      // 因为type是props传过来的，不能直接修改，所以自己家里一条数据。用于是否显示密码框
      passwordVisible: false,
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text'//默认是文本框
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    }
  },
  methods: {//封装v-model要接收value值同时触发它的input事件
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    clear () {
      this.$emit('input', '')//触发的是input事件
    },
    handlePassword () {
      this.passwordVisible = !this.passwordVisible
    },
  },
  computed: {
    showSuffix () {//只要传了其中一个就会显示小图标
      return this.clearable || this.showPassword
    }
  }
}
</script>

<style lang="less" scoped>
  .hm-input {
    width: 100%;
    position: relative;
    font-size: 14px;
    display: inline-block;
    .hm-input_inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      translate: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      &:focus {
        outline: none;
        border-color: #409eff;
      }
      &.is-disabled {
        //&.is-disabled且的意思，是同级样式
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: red;
        cursor: not-allowed;
      }
    }
  }
  //   如果有suffix后缀就会有以下样式
  .hm-input--suffix {
    .hm-input_inner {
      padding-right: 20px;
    }
    .hm-input_suffix {
      position: absolute;
      height: 100%;
      right: 10px;
      top: 0;
      line-height: 40px;
      text-align: center;
      color: #c0c4ba;
      transition: all 0.3s;
      z-index: 900;
      i {
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .hm-icon-yanjing-active {
        color: #409eff;
      }
    }
  }
</style>