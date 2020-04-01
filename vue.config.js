var path = require('path');
const ansiRegex = require('ansi-regex');
console.log(process.env.NODE_ENV);

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
                    @import "@/scss/variables/_variables.scss";
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
