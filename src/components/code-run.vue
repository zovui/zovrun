<template></template>
<script>
import Vue from 'vue.esm'
window.Vue = Vue
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
        getSource (source, type) {
            const regex = new RegExp(`<${type}[^>]*>`)
            let openingTag = source.match(regex)
            if (!openingTag) return ''
            else openingTag = openingTag[0]

            return source.slice(
                source.indexOf(openingTag) + openingTag.length,
                source.lastIndexOf(`</${type}>`)
            )
        },
        splitCode () {
            const script = this.getSource(this.code, 'script').replace(
                /export default/,
                'return '
            )
            const style = this.getSource(this.code, 'style')
            const template = this.getSource(this.code, 'template')
            this.js = script
            this.css = style
            this.html = template
        },
        buildDom (container) {
            this.splitCode()
            if (this.html === '' || this.js === '') {
                this.$Message.error({
                    title: `请输入有效的Vue代码${Math.floor(Math.random() * 1000)}`
                })
                // eslint-disable-next-line semi
                return
            }
            // eslint-disable-next-line no-new-func
            const common = new Function(this.js)()
            common.template = this.html
            const Template = Vue.extend(common)
            this.program = new Template()
            console.log(this.program)
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
            this.buildDom(container)
        }
    }
}
</script>
