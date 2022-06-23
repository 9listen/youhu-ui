<template>
  <transition name="dialog-fade">
    <!-- 对话框的遮罩 -->
    <!-- 点击遮罩层以及关闭按钮都得隐藏.self只有点击自己才能触发，阻止冒泡 -->
    <div class="hm-dialog_wrapper" v-show="visible" @click.self="handleClose">
      <div class="hm-dialog" :style="{ width: width, marginTop: top }">
        <!--  -->
        <div class="hm-dialog_header">
          <!-- 如果传入具名slot,span就不生成，相反 -->
          <slot name="title">
            <span class="hm-dialog_title">{{ title }}</span>
          </slot>
          <button class="hm-dialog_headerbtn" @click="handleClose">
            <i class="hm-icon-close"></i>
          </button>
        </div>
        <!--  -->
        <div class="hm-dialog_body">
          <!-- <span>这是一段信息</span> -->
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <!--  -->
        <div class="hm-dialog_footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HmDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '50%',//不传值的时候默认值
    },
    top: {
      type: String,
      default: '15vh',
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleClose () {//点击关闭模态框：方法一visible只读，不能直接修改，所以得去父组件里面改，触发一个自定义事件
      //   console.log(1);
      //   this.$emit('close', false)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
  // scoped会给当前组件的模板中所有的元素都添加一个随机属性
  // scoped会给当前组件中所有的css样式也添加一个对应的属性选择器
  .hm-dialog_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    background-color: rgba(0, 0, 0, 0.5);
    .hm-dialog {
      position: relative;
      margin: 15vh auto 50px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      width: 30%;
      &_header {
        padding: 20px 20px 10px;
        .hm-dialog_title {
          line-height: 24px;
          font-size: 18px;
          color: #303133;
        }
        .hm-dialog_headerbtn {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 0;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 16px;
          .hm-icon-close {
            color: #909399;
          }
        }
      }
      &_body {
        padding: 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
      }
      &_footer {
        padding: 10px 20px 20px;
        text-align: right;
        box-sizing: border-box;
        // 标签有scoped属性时，它的CSS只作用于当前组件中的元素,父组件的样式将不会渗透到子组件中。
        // 方法1，不用scoped
        //方法2，scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符
        // 像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名
        /deep/ .hm-button:first-child {
          margin-right: 20px;
        }
      }
    }
  }
  .dialog-fade-enter-active {
    animation: fade 0.3s;
  }
  .dialog-fade-leave-active {
    animation: fade 0.3s reverse;
  }
  @keyframes fade {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
</style>