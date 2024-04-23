const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: false,
    lintOnSave: false,
    assetsDir: 'static'
})

