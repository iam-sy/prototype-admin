var path = require('path');
const ansiRegex = require('ansi-regex');

module.exports = {
    outputDir: path.resolve(
        __dirname,
        process.env.DIST,
        //'../prototype-blog-backend/public/manager',
    ),
    //publicPath: '/front',
    //publicPath: '/manager',
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/scss/mixins/_mixins.scss";
                `,
            },
        },
    },

    devServer: {
        overlay: false,
        proxy: {
            '/api': {
                target: 'http://localhost:2222/api',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
    transpileDependencies: [ansiRegex],
};
