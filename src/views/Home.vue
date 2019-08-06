<template>
    <div>
        <editor v-model="code" :theme="theme" @on-change="codeChange"/>
        <br />
        <div ref="run-container">
            <codeRun :value="code" ref="run"/>
        </div>
    </div>
</template>

<script>
    import editor from '../components/codemirror'
    import codeRun from '../components/code-run'
    const prefix = 'groot-home'
    // 默认代码
    const defaultCode =
        `<template>
    <div></div>
</template>
<script>
export default {
    name: 'zov-xxxx'
}
<\/script>
<style scoped>

</style>`

    export default {
        name: prefix,
        components:{
            editor,
            codeRun
        },
        data () {
            return {
                code: defaultCode
            }
        },
        computed: {
            theme () {
                return this.isDark ? 'dark' : 'light'
            }
        },
        methods:{
            codeChange (val) {
                console.log(val)
                setTimeout(() => {
                    this.$refs.run.codeRun(this.$refs['run-container'])
                }, 100)
            }
        }
    }
</script>
