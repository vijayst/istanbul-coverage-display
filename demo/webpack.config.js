const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: './index.html'
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
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
