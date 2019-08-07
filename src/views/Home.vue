<template>
    <Layout class="zov-run">
        <Header class="zov-run-header">
            <div class="zov-run-header-logo">
                <img src="../assets/logo.png" alt="">
                <span>ZovRun</span>
            </div>
            <div class="zov-run-header-tools">
                <Button iconname="refresh" @click="reset">&nbsp;重置</Button>
            </div>
            <div class="zov-run-header-tools">
                <Button circle :iconname="isFullScreen ? 'contract' : 'expand'" @click="isFullScreen = !isFullScreen"/>
                <Button circle :iconname="isDark ? 'moon' : 'sunny'" @click="isDark = !isDark"/>
                <ToolTip
                    trigger="click"
                    title="使用说明"
                    high-color
                >
                    <div
                        slot="tooltip"
                        class="zov-run-helper"
                    >
                        <p>
                            <span>Zov Run</span> 集成了zovui，目的是为zov组件实例提供在线运行环境。您可以直接编写一个 .vue 的文件，
                            它包含了 template、script、style 三部分。
                        </p>
                        <p>
                            <span>Zov Run</span> 依赖 vue.esm 实现在线模板编译，此环境下编写 .vue 文件需注意一下几点：
                            <br>
                            1、ES6语法需要根据浏览器支持程度；
                            <br>
                            2、不支持预编译语言如：sass、less等；
                            <br>
                            3、SFC中 style 块进行了拼接，所以可以写多个 script 块。
                        </p>
                    </div>
                    <Button iconname="help" circle/>
                </ToolTip>
            </div>
        </Header>
        <Layout class="zov-run-container zov-layout-has-sider">
            <div><editor ref="editor" v-model="code" :watchValue="watchValue" :theme="theme" @on-change="codeChange"/></div>
            <div ref="run-container">
                <codeRun :value="code" ref="run"/>
            </div>
        </Layout>
    </Layout>
</template>

<script>
import editor from '../components/codemirror'
import codeRun from '../components/code-run/code-run'
import { fullScreen, exitScreen } from '@/utils/window-tools'
// 默认代码
import defaultCode from './default-code'
const prefix = 'groot-home'
export default {
    name: prefix,
    components:{
        editor,
        codeRun
    },
    data () {
        return {
            code: defaultCode,
            watchValue: defaultCode,
            codeCopy: defaultCode,
            timer: null,
            isFullScreen: false,
            isDark: false
        }
    },
    computed: {
        theme () {
            return this.isDark ? 'dark' : 'light'
        }
    },
    methods:{
        clearTimer () {
            clearTimeout(this.timer)
            this.timer = null
        },
        codeChange () {
            this.clearTimer()
            this.timer = setTimeout(() => {
                this.$refs.run.codeRun(this.$refs['run-container'])
                this.clearTimer()
            }, 500)
        },
        reset () {
            this.$refs['editor'].editor.setValue(this.codeCopy)
        }
    },
    watch: {
        isDark(val) {
            val
                ? this.$Dark.open(() => {
                    localStorage.setItem('zov-theme', 'dark')
                })
                : this.$Dark.close(() => {
                    localStorage.setItem('zov-theme', '')
                })
        },
        isFullScreen (val) {
            val
                ? fullScreen()
                : exitScreen()
        }
    },
    mounted() {
        localStorage.getItem('zov-theme') === 'dark' ? this.$Dark.open() : this.$Dark.close()
        this.isDark = localStorage.getItem('zov-theme') === 'dark'
        window.name && (this.watchValue = this.codeCopy = window.name)
        this.codeChange()
    }
}
</script>
