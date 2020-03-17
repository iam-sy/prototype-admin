var path = require('path');
const ansiRegex = require('ansi-regex');

module.exports = {
    outputDir: path.resolve(__dirname, '../prototype-blog-backend/public/'),
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
