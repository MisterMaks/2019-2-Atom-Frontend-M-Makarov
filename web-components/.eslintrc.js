module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    extends: 'airbnb-base',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'no-dupe-keys': 0,
        'prefer-template': 1,
        'object-shorthand': 1,
        'no-restricted-globals': 1,
        // 'no-plusplus': 1,
        semi: 1,
        // 'default-case': 1,
        'no-case-declarations': 0,
        radix: 0,
        'prefer-template': 0,

        // Indent with 4 spaces
        indent: 0,
        'no-var': 0,
        eqeqeq: 0,

        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],

        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'default-case': 0,
    },
};
