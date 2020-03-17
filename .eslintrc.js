module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-unused-vars': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                useTabs: false,
                tabWidth: 4,
                trailingComma: 'all',
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: 'avoid',
            },
        ],
    },
};
