import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import scss from 'rollup-plugin-scss'

const babelOptions = () => ({
    exclude: 'node_modules/**',
    presets: [['@babel/env', { modules: false }], '@babel/react'],
    plugins: [
        '@babel/proposal-object-rest-spread'
    ]
});

export default [
    {
        input: 'src/index.js',
        output: {
            file: pkg.module,
            format: 'es',
        },
        external: ['react', 'istanbul-lib-coverage', 'prop-types'],
        plugins: [babel(babelOptions()), scss({ output: 'dist/bundle.css' })],
    },
    {
        input: 'src/index.js',
        output: {
            file: pkg.main,
            format: 'cjs',
            globals: {
                react: 'React'
            }
        },
        external: ['react', 'istanbul-lib-coverage', 'prop-types'],
        plugins: [nodeResolve(), babel(babelOptions()), commonjs(), scss({ output: 'dist/bundle.css' })],
    }
];