<template>
    <div class="groot-codemirror">
        <textarea ref="code" :value="value"></textarea>
    </div>
</template>
<script>
    import CodeMirror from 'codemirror/lib/codemirror.js'
    import 'codemirror/lib/codemirror.css'
    // 主题
    import 'codemirror/theme/base16-light.css'
    import 'codemirror/theme/base16-dark.css'
    // active-line
    import 'codemirror/addon/selection/active-line.js'
    // 光标匹配括号
    import 'codemirror/addon/edit/matchbrackets.js'
    // 光标匹配标签
    import 'codemirror/addon/edit/matchtags.js'
    // 自动补全括号
    import 'codemirror/addon/edit/closebrackets.js'
    // xml '>' 自动补全标签
    import 'codemirror/addon/edit/closetag.js'
    // styleSelectedText 【待查】
    import 'codemirror/addon/selection/mark-selection.js'
    // 语言
    import 'codemirror/mode/vue/vue.js'
    // 搜索高亮匹配及 keymap
    /* *
        findCtrl-F (PC), Cmd-F (Mac)
        findNextCtrl-G (PC), Cmd-G (Mac)
        findPrevShift-Ctrl-G (PC), Shift-Cmd-G (Mac)
        replaceShift-Ctrl-F (PC), Cmd-Alt-F (Mac)
        replaceAllShift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)
    * */
    import 'codemirror/addon/scroll/annotatescrollbar.js'
    import 'codemirror/addon/search/matchesonscrollbar.js'
    import 'codemirror/addon/search/searchcursor.js'
    import 'codemirror/addon/search/match-highlighter.js'
    // keymap，注释、反注释 command+/
    import 'codemirror/addon/comment/comment.js'
    // keyMap
    import 'codemirror/mode/clike/clike.js'
    import 'codemirror/addon/dialog/dialog.js'
    import 'codemirror/addon/dialog/dialog.css'
    import 'codemirror/addon/search/search.js'
    import 'codemirror/keymap/sublime.js'
    // 代码折叠
    import 'codemirror/addon/fold/foldcode.js'
    import 'codemirror/addon/fold/foldgutter.js'
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/fold/brace-fold.js'
    import 'codemirror/addon/fold/comment-fold.js'
    import 'codemirror/addon/fold/indent-fold.js'
    import 'codemirror/addon/fold/markdown-fold.js'
    import 'codemirror/addon/fold/xml-fold.js'
    // 自动完成
    import 'codemirror/addon/hint/show-hint.js'
    import 'codemirror/addon/hint/show-hint.css'
    import 'codemirror/addon/hint/css-hint.js'
    import 'codemirror/addon/hint/anyword-hint.js'
    import 'codemirror/addon/hint/javascript-hint.js'
    // import 'codemirror/addon/hint/html-hint.js' // html
    // import 'codemirror/addon/hint/xml-hint.js' // xml

    export default {
        name: 'groot-codemirror',
        props: {
            value: {
                type: String,
                default: ''
            },
            watchValue: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                default: 'light'
            },
            readOnly: {
                // true、false、nocursor(不可编辑且不可获得焦点)
                type: [Boolean, String],
                default: false
            },
        },
        data () {
            return {
                code: ''
            }
        },
        watch: {
            theme (val) {
                this.editor.setOption('theme', 'base16-' + val)
            },
            readOnly (val) {
                this.editor.setOption('readOnly', val)
            },
            watchValue (val) {
                this.editor.setValue(val)
            }
        },
        mounted() {
            this.editor = CodeMirror.fromTextArea(this.$refs['code'], {
                // 以什么格式进行高亮
                mode: 'text/x-vue',
                // 主题
                theme: 'base16-' + this.theme,
                lineNumbers: true, // 是否在编辑器左侧显示行号
                firstLineNumber: 1, // 行号从哪个数开始计数，默认为1
                indentWithTabs: true, // tab字符的宽度，默认为4
                indentUnit: 4, // 缩进字节
                smartIndent: true, // 自动缩进，设置是否根据上下文自动缩进,默认为true
                matchBrackets : true, // 括号匹配
                autofocus: false,  // 是否在初始化时自动获取焦点
                extraKeys: {"Ctrl-W": "autocomplete"}, // 自动补全已经写过的单词
                readOnly: this.readOnly, // 编辑器是否只读,并且不能获得焦点
                showCursorWhenSelecting:true, // 在选择时是否显示光标，默认为false
                foldGutter: true, // 代码折叠
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], //行号的折叠标识
                autoCloseBrackets: true, // 自动补全括号
                autoCloseTags: true, // 自动补全标签
                styleActiveLine: true,
                keyMap: "sublime",
                matchTags: { bothTags: true }, // 匹配显示标签
                hintOptions: { // 自动完成的配置项
                    completeSingle: false, //不自动补全
                }
            })
            this.editor.on('inputRead', (cm, changes) => {
                // 在英文字母或连续英文字母键入时触发自动完成提示。
                /^[a-z]+$/i.test(changes.text[0]) && this.editor.execCommand('autocomplete')
            })
            this.editor.on('change', () => {
                this.$emit('input', this.editor.getValue())
                this.$emit('on-change', this.editor.getValue())
            })
        }
    }
</script>
