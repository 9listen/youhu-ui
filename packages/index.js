// 整个包的入口,导出install https://cn.vuejs.org/v2/api/#Vue-use
// 定义install方法，接收Vue作为参数，如果使用use注册插件，则所有的组件都将被注册
import Button from './button.vue'
import Dialog from './dialog.vue'
import Input from './input.vue'
import Switch from './switch.vue'
import Radio from './radio.vue'
import RadioGroup from './radio-group.vue'
import Checkbox from './checkbox.vue'
import CheckboxGroup from './checkbox-group.vue'
import Form from './form.vue'
import FormItem from './form-item.vue'
import './fonts/iconfont.css'
// 存储组件列表
const components = [
    Button,
    Dialog,
    Input ,
    Switch,
    Radio ,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Form,
    FormItem,
]
const install = function (Vue) {
    // 全局注册所有组件-遍历组件
    components.forEach((item) => {
        Vue.component(item.name, item)
    })
}
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
// 如果全局引入的vue，全局里面有vue的话，直接叫install把vue传进来，直接全局注册好这些组件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default { install }