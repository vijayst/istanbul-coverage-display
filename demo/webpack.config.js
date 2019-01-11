const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: './index.html'
});

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: process.env.NODE_ENV === 'production' ? '/istanbul-coverage-display/' : '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', { modules: false }], 'react'],
                        plugins: [
                            'istanbul'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [htmlWebpackPlugin]
};
