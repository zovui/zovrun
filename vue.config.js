const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
	publicPath: './',
	outputDir: 'docs',
	filenameHashing: true,
    chainWebpack (config) {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('vue:esm', 'vue/dist/vue.esm.js')
    },
}
