<template></template>
<script>
import Vue from 'vue:esm'
import { getSource } from './utils'
Vue.config.silent = true // 忽略编译警告
// Vue.config.warnHandler = function (msg, vm, trace) {
//     // `trace` 是组件的继承关系追踪
// }
Vue.config.errorHandler = function (err, vm, info) {
    console.log(err, vm, info)
}
import Zov from 'zov'
Vue.use(Zov)
const prefix = 'groot-code-run'
export default {
    name: prefix,
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            code: this.value,
            html: '',
            js: '',
            css: '',
            program: null,
            styleTag: document.createElement('style')
        }
    },
    watch: {
        value (val) {
            this.code = val
        }
    },
    methods: {
        splitCode () {
            const script = getSource(this.code, 'script')[0] || 'export default {}'
            const style = getSource(this.code, 'style')
            const template = getSource(this.code, 'template')
            this.js = script.replace(
                /export default/,
                'return '
            )
            this.css = style.join('')
            this.html = template[0]
        },
        buildDom (container) {
            this.splitCode()
            // eslint-disable-next-line no-new-func
            const common = new Function(this.js)()
            common.template = this.html
            const Template = Vue.extend(common)
            this.program = new Template()
            if (this.css !== '') {
                this.styleTag.type = 'text/css'
                this.styleTag.innerHTML = this.css
                document.getElementsByTagName('head')[0].appendChild(this.styleTag)
            }
            container.appendChild(this.program.$mount().$el)
        },
        reset (container) {
            container.innerHTML = ''
            if (this.program) {
                this.program.$destroy()
            }
            this.program = null
        },
        codeRun (container) {
            this.reset(container)
            try {
                this.buildDom(container)
            } catch (e) {}
        }
    }
}
</script>
