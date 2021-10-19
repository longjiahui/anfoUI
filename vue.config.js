module.exports = {
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
        resolve: {
            alias: {
                '@main': '@/main',
                '@components': '@main/components',
                '@scripts': '@main/assets/scripts',
                '@styles': '@main/assets/styles',
            }
        }
    }
}