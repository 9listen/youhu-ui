<template>
  <!-- 这里label的for=input或者name都可以实现关联到input框，点击label就自动点击到了input框-->
  <label
    for="input"
    class="hm-switch"
    :class="{ 'is-checked': value }"
    @click="handleClick"
  >
    <!-- 这里隐藏了这个input框。如果input在label里面，label表单会和input框自动建立关联，如果input在label外面，当label的for值=input的id值也会建立关联-->
    <input class="hm-switch_input" type="checkbox" :name="name" ref="input" />
    <!-- ref="core"操作dom -->
    <span class="hm-switch_core" ref="core">
      <span class="hm-switch_button"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'HmSwitch',
  props: {
    value: {//只要有v-model就一定会有value值和input事件传过来
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: '',
    },
    inactiveColor: {
      default: '',
    },
    name: {
      type: String,
      default: '',
    }
  },
  methods: {
    async handleClick () {
      this.$emit('input', !this.value)
      //点击的时候还需要改颜色
      //等待value发生变化的时候，再setColor
      //🌸🌸数据修改后，等待DOM更新循环结束之后,再修改按钮的颜色
      await this.$nextTick()
      this.setColor()
      this.$refs.input.checked = this.value//修改checked的值和value值完全同步
    },
    // 封装颜色的变化，等待调用
    setColor () {
      if (this.activeColor || this.inactiveColor) {
        let color = this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    }
  },
  mounted () {
    // 组件一渲染就显示颜色，并且修改开关颜色
    this.setColor()
    this.$refs.input.checked = this.value
  }
}
</script>

<style lang="less" scoped>
  .hm-switch {
    position: relative;
    display: inline-block;
    align-items: center;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    .hm-switch_input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      margin: 0;
    }
    .hm-switch_core {
      position: relative;
      display: inline-block;
      margin: 0;
      width: 40px;
      height: 20px;
      border: 1px solid #dcdfe6;
      border-radius: 10px;
      box-sizing: border-box;
      background: #dcdfe6;
      outline: none;
      cursor: pointer;
      transition: border-color 0.3s, background-color 0.3s;
      vertical-align: middle;
      .hm-switch_button {
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 100%;
        transition: all 0.3s;
        width: 16px;
        height: 16px;
        background-color: #fff;
      }
    }
  }
  .hm-switch.is-checked {
    .hm-switch_core {
      border-color: #409eff;
      background-color: #409eff;
      .hm-switch_button {
        transform: translateX(20px);
      }
    }
  }
</style>