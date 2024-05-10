const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: false,
    lintOnSave: false,
    assetsDir: 'static',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            }
        }
    }
})

